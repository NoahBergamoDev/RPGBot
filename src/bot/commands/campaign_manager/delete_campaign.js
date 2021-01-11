module.exports = {
  name: "delete_campaign",
  aliases: ["del_campaign", "del_campaign", "dc"],
  description: "Deletes a campaign",
  category: "campaign_manager",
  guildOnly: true,
  cooldown: 2,
  usage: "delete_campaign <campaign name>",

  run: async (client, message, args, user, text, prefix, campaignManager) => {
    //TODO: ACTUALLY DELETE THE CAMPAIGN FROM DATABASE.
    let server = message.guild;
    const categoryName = `Campaign - ${text}`;
    const roleName = `DM (${text})`;

    const campaign = campaignManager.campaigns.find((camp) => {
      return (
        camp.title.toLowerCase() === text.toLowerCase() &&
        camp.createdBy === user.id
      );
    });
    if (!campaign) {
      message.reply(
        `There's no campaign with the name of "${text}" associated to your username.`
      );
      message.delete();
      return;
    }
    const channel = server.channels.cache.find(
      (channel) => channel.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (!channel) {
      message.reply(`There's no channel with name of "${text}"`);
      return;
    }
    server.roles.cache
      .find((role) => role.name.toLowerCase() === roleName.toLowerCase())
      .delete();
    channel.children.forEach((ch) => ch.delete());
    channel.delete();
    campaignManager.deleteCampaign(text);
    message
      .reply(
        `Campaign ${text} deleted. Total of ${campaignManager.campaigns.length} campaigns.`
      )
      .then((msg) => msg.delete({ timeout: 10000 }));
    message.delete();
  },
};
