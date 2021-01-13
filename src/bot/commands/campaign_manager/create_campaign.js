const Player = require("../../../models/PlayerModel");
const Constants = require('../../../utils/constants.js');
const Utils = require("../../../utils/utils.js");

module.exports = {

  name: "create_campaign",
  category: "campaign_manager",
  aliases: ["cc", "new_campaign", "create_new_campaign"],
  cooldown: 2,
  usage: "create_campaign",
  description: "Create a new RPG campaign",

  //running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix, controllers) => {
    if (!message.channel.name.toLowerCase().includes('create-campaign')) {
      return;
    }

    const setUserAsDM = (user, role) => {
      user.roles.add(role);
    };

    const manageRoles = async (server, campaignTitle) => {
      const serverDMRole = await Utils.createRole(
        server,
        `DM (${campaignTitle})`
      );
      const serverPlayerRole = await Utils.createRole(
        server,
        `Player (${campaignTitle})`
      );
      setUserAsDM(message.member, serverDMRole);
      return [serverDMRole, serverPlayerRole];
    };

    const createChannels = async (
      message,
      campaignTitle,
      maxPlayers,
      roles
    ) => {
      const server = message.guild;
      const everyone = await message.guild.roles.cache.find((role) => {
        return role.name === "@everyone";
      });
      const categoryName = `💎 Campaign - ${campaignTitle}`;

      if (
        !server.channels.cache.find((channel) => channel.name === categoryName)
      ) {
        server.channels
          .create(categoryName, {
            type: "category",
            permissionOverwrites: [
              {
                id: everyone,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: roles[0],
                allow: ["VIEW_CHANNEL"],
              },
              {
                id: roles[1],
                allow: ["VIEW_CHANNEL"],
              },
            ],
          })
          .then((category) => {

            //Create all predefined channels
            Constants.ChannelsModelList.forEach(ch => {
              if (ch.options.type === 'voice') {
                ch.options = { ...ch.options, parent: category, userLimit: maxPlayers }
              } else {
                ch.options = { ...ch.options, parent: category }
              }
              Utils.createChannel(server, ch);
            });
          });
      }

      message.channel.send(
        `Perfect! All of your channels were automatically created for you. I wish you the best of moments in this campaign!`
      );
    };
    const { campaignController } = controllers;
    const filter = (m) => m.author.id === message.author.id;
    const server = message.guild;

    message.channel
      .send(
        `Hello, ${message.author}. Let's create your campaign! \nWhat title will this magnificent story have?`
      )
      .then(() => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then((msg) => {
            const campaignTitle = msg.first().content;
            message.channel
              .send(
                `That is indeed a epic campaign name! \nHow many adventurers will "${campaignTitle}" have, besides you?`
              )
              .then(() =>
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                  })
                  .then(async (mess) => {
                    // message.channel.send(
                    //   `I beg your pardon. I did not understand what number you typed.. Anyway, I'm letting your table without maximum of players. You can change it after with the command [!INSIRA O COMANDO AQUI DEPOIS]`
                    // );
                    const maxPlayers = parseInt(mess.first().content) + 1;
                    const campaign = campaignController.createCampaign(
                      server.id,
                      campaignTitle,
                      maxPlayers,
                      user.id
                    );

                    const roles = await manageRoles(server, campaignTitle);
                    createChannels(message, campaignTitle, maxPlayers, roles);
                  })
              );
          })
          .catch((collected) => {
            message.channel.send(`timeout`);
          });
      });
  },
};
