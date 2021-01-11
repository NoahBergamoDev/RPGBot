module.exports = {
  name: "clear_trash",
  aliases: [],
  description: "Clean General channels from server",
  category: "info",
  guildOnly: true,
  cooldown: 2,
  usage: "!clean_trash",
  run: async (client, message, args, user, text, prefix, controllers) => {
    message.guild.channels.cache.map((c) => {
      if (
        c.name.toLowerCase() === "general" ||
        c.name.toLowerCase() === "rolls" ||
        c.name.toLowerCase() === "session-0" ||
        c.name.toLowerCase() === "session 0" ||
        c.name.toLowerCase() === "off-topic" ||
        c.name.toLowerCase() === "campaign-related-chat" ||
        c.name.toLowerCase() === "schedule" ||
        c.name.toLowerCase() === "announcements" ||
        c.name.toLowerCase() === "private encounter" ||
        c.name.toLowerCase() === "private-notes" ||
        c.name.toLowerCase() === "dm-commands" ||
        c.name.startsWith("Campaign -")
      ) {
        c.delete();
      }
    });

    message.guild.roles.cache.map((r) => {
      if (r.name.startsWith("DM") || r.name.startsWith("Player")) {
        r.delete();
      }
    });
    message.delete();
  },
};
