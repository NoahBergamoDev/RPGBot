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
        c.name.toLowerCase().includes("general") ||
        c.name.toLowerCase().includes("rolls") ||
        c.name.toLowerCase().includes("session-0") ||
        c.name.toLowerCase().includes("session 0") ||
        c.name.toLowerCase().includes("off-topic") ||
        c.name.toLowerCase().includes("campaign-related-chat") ||
        c.name.toLowerCase().includes("schedule") ||
        c.name.toLowerCase().includes("announcements") ||
        c.name.toLowerCase().includes("private encounter") ||
        c.name.toLowerCase().includes("private-notes") ||
        c.name.toLowerCase().includes("dm-commands") ||
        c.name.toLowerCase().includes("campaign -")
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
