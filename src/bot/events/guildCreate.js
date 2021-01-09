module.exports = (client, controllers) =>
  client.on("guildCreate", (guild) => {
    console.log(guild);
    guild.owner.send("Thanks! You can use !help to discover commands.");
    console.log(
      `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
  });
