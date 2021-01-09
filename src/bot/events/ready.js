//here the event starts
const ascii = require("ascii-table");
let table = new ascii("Discord servers running me."); //creating a new table with the name "Commands"
table.setHeading("Server", "ServerID");

module.exports = (client, controllers) => {
  client.user.setActivity("to Epic Stories", { type: "LISTENING" });
  controllers.serverController.updateServers(client.guilds.cache);

  client.guilds.cache.forEach((guild) => {
    table.addRow(guild.name, guild.id);
  });

  console.log(table.toString());
  console.log("\nConnected on Discord as " + client.user.tag);
};
