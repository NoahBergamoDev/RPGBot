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
  timedReply: async (message, reply, timeout) => {
    message.reply(reply).then((msg) => msg.delete({ timeout }));
    message.delete({ timeout });
  },
};
