const Player = require("../../../models/PlayerModel");
const Utils = require("../../../utils/utils.js");
//Here the command starts
module.exports = {
  //definition
  name: "create_campaign", //the name of the command
  category: "campaign_manager", //the category this will be listed at, for the help cmd
  aliases: ["cc", "new_campaign", "create_new_campaign"], //every parameter can be an alias
  cooldown: 2, //this will set it to a 2 second cooldown
  usage: "create_campaign", //this is for the help command for EACH cmd
  description: "Create a new RPG campaign", //the description of the command

  //running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix, controllers) => {
    const createChannel = async (channelName, options) => {
      return await server.channels.create(channelName, options);
    };

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
      const categoryName = `Campaign - ${campaignTitle}`;

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
            //Generate pre-defined public (only with players) text channels
            createChannel("schedule", {
              type: "text",
              parent: category,
            });
            createChannel("announcements", {
              type: "text",
              parent: category,
            });
            createChannel("off-topic", {
              type: "text",
              parent: category,
            });
            createChannel("campaign-related-chat", {
              type: "text",
              parent: category,
            });
            createChannel("session-0", {
              type: "text",
              parent: category,
            });
            createChannel("rolls", {
              type: "text",
              parent: category,
            });

            //Generate pre-defined private text channels
            createChannel("dm-commands", {
              type: "text",
              parent: category,
            });
            createChannel("private-notes", {
              type: "text",
              parent: category,
            });

            //Generate pre-defined public (only with players) voice channels
            createChannel("Session 0", {
              type: "voice",
              parent: category,
              userLimit: maxPlayers,
            });
            createChannel("Private encounter", {
              type: "voice",
              parent: category,
              userLimit: maxPlayers,
            });
          });
      }

      message.channel.send(
        `Perfect! All of your channels were automatically created for you. I wish you the best of moments in this campaign!`
      );
    };
    const { campaignController, serverController } = controllers;
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
