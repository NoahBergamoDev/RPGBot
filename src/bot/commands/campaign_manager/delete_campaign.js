module.exports = {
  name: "delete_campaign",
  aliases: ["del_campaign", "del_campaign", "dc"],
  description: "Deletes a campaign",
  category: "campaign_manager",
  guildOnly: true,
  cooldown: 2,
  usage: "delete_campaign <campaign name>",

  run: async (client, message, args, user, text, prefix, controllers) => {
    if (!text || text.length === 0) {
      return;
    }
    const { campaignController } = controllers;
    let server = message.guild;
    const categoryName = `campaign - ${text.toLowerCase()}`;
    const dmRoleName = `dm (${text.toLowerCase()})`;
    const playerRoleName = `player (${text.toLowerCase()})`;

    const campaign = await campaignController.findCampaignByTitle(text, user);

    if (!campaign) {
      message.reply(
        `There's no campaign with the name of "${text}" associated to your username.`
      );
      message.delete();
      return;
    }
    const channel = server.channels.cache.find(
      (channel) => channel.name.toLowerCase() === categoryName
    );
    if (!channel) {
      message.reply(`There's no channel with name of "${text}"`);
      return;
    }
    //Delete Campaign---------
    campaignController.deleteCampaign(campaign);

    //Delete Roles------------
    server.roles.cache
      .find((role) => role.name.toLowerCase() === dmRoleName)
      .delete();
    server.roles.cache
      .find((role) => role.name.toLowerCase() === playerRoleName)
      .delete();
    //Delete Channels---------
    channel.children.forEach((ch) => ch.delete());
    //Delete Category---------
    channel.delete();

    message.reply(`Campaign ${text} deleted.`);
    // .then((msg) => msg.delete({ timeout: 10000 }));
    // message.delete();
  },
};
