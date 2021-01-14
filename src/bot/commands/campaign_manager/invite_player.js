module.exports = {
    name: "invite_player",
    aliases: ["ip"],
    category: "campaign_manager",
    cooldown: 2,
    usage: "invite_player",
    description: "Invite a player to join your campaign. Must be used inside your campaign's dm-command channel",
    run: async (client, message, args, user, text, prefix, controllers) => {
        const filter = (m) => m.author.id === message.author.id;
        const { campaignController } = controllers;

        if (!message.channel.name.toLowerCase().includes('dm-commands')) {
            return;
        }
        const roles = message.member.roles.cache;
        const hasDMRole = roles.find(r => r.name.toLowerCase().includes('dm'))

        if (!hasDMRole) {
            message.reply("Excuse me?! Who you think you are? Only the DM can add players to the table. Pff. Get lost, filth.")
        }
        message.reply('More people to the party, awesome! Who is the lucky player that will play your campaign? (Mention the discord user with: @username)').then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ["time"]
            }).then(async msg => {
                const mentionedMember = message.guild.member(msg.first().mentions.users.first())
                const parentName = message.channel.parent.name
                const campaignName = parentName.substr(parentName.indexOf('- ') + 1).trim()

                if (!mentionedMember) {
                    message.reply("Sorry, there's no user with this name ")
                    return;
                }
                const campaign = await campaignController.findCampaignByTitle(campaignName);
                if (campaign.players.find(p => p === mentionedMember.id)) {
                    message.reply(`By my calculations, <@${mentionedMember.id}> is already in your campaign.`)
                    return;
                }
                campaignController.addPlayer(campaign._id, mentionedMember.id, (mentionedMember.nickname || mentionedMember.user.username));
            })

        })
    },
};