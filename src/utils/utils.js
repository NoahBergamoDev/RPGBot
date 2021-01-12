module.exports = {
  createRole: async (server, roleName) => {
    const role = server.roles.cache.find((role) => {
      return role.name === roleName;
    });
    if (role) return role;
    return await server.roles.create({
      data: {
        name: roleName,
        color: "BLUE",
      },
    });
  },
  createChannel: async (server, channel) => {
    return await server.channels.create(channel.title, channel.options);
  },
  timedReply: async (message, reply, timeout) => {
    message.reply(reply).then((msg) => msg.delete({ timeout }));
    message.delete({ timeout });
  },
};
