const Server = require("../models/ServerModel");

module.exports = class ServerController {
  constructor() {
    this.servers = [];
  }
  createServer = async (serverName, serverId) => {
    if (this.servers.find((s) => s.serverId === serverId)) {
      console.log("This server is already created.");
      return;
    }
    const server = await new Server({
      serverName,
      serverId,
      addedDate: Date.now(),
      campaigns: [],
    })
      .save()
      .then((newServer) => {
        this.servers.push(newServer);
        console.log("Server created successfully.");
      })
      .catch((e) => {
        console.log("Error creating the server. Error: ", e);
      });
  };
  //* Makes sure that all server on the discord are the same as the ones on the server
  updateServers = async (discordServers) => {
    const servers = await Server.find();

    if (!discordServers || discordServers.size == 0) {
      console.log(`There's no guild linked to this bot.`);
    }
    console.log(
      `There is ${servers.length} servers on database and ${discordServers.size} discord guilds. `
    );
    discordServers.map(async (s) => {
      const serverDB = servers.find((serv) => serv.serverId === s.id);
      let localServer = serverDB;
      if (!serverDB) {
        console.log(
          `There was no server with the id ${s.id}. Creating one instance on the database.`
        );
        localServer = await this.createServer(s.name, s.id);
      }
      console.log(`Server "${s.name}" - ok`);
    });
  };
  getServerByDiscordID = (discordServerID) => {
    return this.servers.find((s) => s.serverId === discordServerID);
  };
};
