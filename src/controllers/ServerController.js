const Server = require("../models/ServerModel");

module.exports = class ServerController {
  constructor() {
    this.servers = [];
  }
  createServer(serverName, serverId, addedDate) {
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
  }
};
