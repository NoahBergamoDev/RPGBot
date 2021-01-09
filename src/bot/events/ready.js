//here the event starts
module.exports = (client) => {
  client.user.setActivity("to Epic Stories", { type: "LISTENING" });

  client.guilds.cache.forEach((guild) => {
    console.log(guild.id);
  });
  console.log("Connected as " + client.user.tag);
};
