const config = require("./config.json");
const Discord = require("discord.js");
const Database = require("./src/Database/Database");

const client = new Discord.Client();

client.on("ready", () => {
  const db = new Database();
  db.connectDatabase();

  client.user.setActivity("to epic stories", { type: "LISTENING" });

  client.guilds.cache.forEach((guild) => {
    console.log(guild.id);
  });
  console.log("Connected as " + client.user.tag);
});
client.login(config.token);
