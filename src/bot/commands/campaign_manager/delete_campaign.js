module.exports = {
  name: "delete_campaign",
  aliases: ["del_campaign", "del_campaign", "dc"],
  description: "Deletes a campaign",
  category: "campaign_manager",
  guildOnly: true,
  cooldown: 2,
  usage: "delete_campaign>",

  run: async (client, message, args, user, text, prefix, controllers) => {
    if (!message.channel.name.toLowerCase().includes("dm-commands")) {
      message.reply(`I'm sorry. I don't know about what campaign you are refering to. Use this command on the "dm-commands" channel, inside the campaign you want to delete.`);
      return;
    }
    const campaignName = message.channel.parent.name.split("-")[1].trim();
    const filter = (m) => m.author.id === message.author.id;

    message
      .reply(
        `WHAT?! You're leaving me? What have I done? It was my lack of support? It was my awful sense of humor?\n...\n Anyway, are you sure you want to delete "${campaignName}"? (Yes/No)`
      )
      .then(() => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then(async (msg) => {
            const confirmation = msg.first().content.toLowerCase();
            if (confirmation !== "y" && confirmation !== "yes") {
              message.channel.send(
                `Glad you changed your mind! Campaign not deleted.`
              );
              return;
            }

            let server = message.guild;
            const { campaignController } = controllers;
            const categoryName = `💎 campaign - ${campaignName.toLowerCase()}`;
            const dmRoleName = `dm (${campaignName.toLowerCase()})`;
            const playerRoleName = `player (${campaignName.toLowerCase()})`;

            const campaign = await campaignController.findCampaignByTitle(
              campaignName,
              user
            );
            if (!campaign || campaign.createdByDiscordID !== message.author.id) {
              message.reply(
                `There's no campaign with the name of "${campaignName}" associated to your username.`
              );
              message.delete();
              return;
            }
            const channel = server.channels.cache.find(
              (channel) => channel.name.toLowerCase().includes(categoryName)
            );
            if (!channel) {
              message.reply(
                `There's no channel with name of "${campaignName}"`
              );
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

            message.reply(`Campaign "${text}" deleted.`);
          });
      });
  },
};
