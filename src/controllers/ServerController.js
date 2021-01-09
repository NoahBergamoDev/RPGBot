const Server = require("../models/ServerModel");

module.exports = class ServerController {
  constructor(db) {
    this.db = db;
    this.servers = [];
  }
  createServer = (serverName, serverId) => {
    if (this.servers.find((s) => s.serverId === serverId)) {
      console.log("This server is already created.");
      return;
    }
    const server = new Server({
      serverName,
      serverId,
      addedDate: Date.now(),
      campaigns: [],
    })
      .save()
      .then((_) => {
        this.servers.push(server);
        console.log("Server created successfully.");
      })
      .catch((e) => {
        console.log("Error creating the server. Error: ", e);
      });
  };
  //* Makes sure that all server on the discord are the same as the ones on the server
  updateServers = async (discordServers) => {
    const servers = await Server.find();

    if (!discordServers || discordServers.length == 0) {
      console.log(`There's no guild linked to this bot.`);
    }
    console.log(
      `There is ${servers.length} servers on database and ${discordServers.length} discord guilds. `
    );
    discordServers.map((s) => {
      const serverDB = servers.find((serv) => serv.serverId === s.id);
      if (!serverDB) {
        console.log(
          `There was no server with the id ${s.id}. Creating one instance on the database.`
        );
        this.createServer(s.name, s.id);
      }
      console.log(`Server "${s.name}" - ok`);
    });
  };
};
