const Campaign = require("../models/CampaignModel.js");
const Player = require("../models/PlayerModel.js");
const { DUNGEONS_N_DRAGONS_5E } = require("../utils/constants.js");

module.exports = class CampaignController {
  constructor() {
    this.id = Date.now();
    this.campaigns = [];
    this.updateCampaignsFromDB();
  }

  createCampaign = async (serverId, title, maxOfPlayers, userId) => {
    let dbCampaign = await Campaign.findOne({ title: title });

    let localCampaign = null;
    if (dbCampaign) {
      console.log("There's already a campaign with this name.");

      localCampaign = this.campaigns.find((ca) => {
        if (!ca) {
          return null;
        }
        if (ca._id === dbCampaign._id) {
          return ca;
        }
        return null;
      });
    }

    if (!dbCampaign) {
      dbCampaign = await new Campaign({
        serverId: serverId,
        createdByDiscordID: userId,
        ruleSystemID: DUNGEONS_N_DRAGONS_5E,
        title,
        maxPlayers: maxOfPlayers,
        dmID: userId,
      })
        .save()
        .catch((e) => {
          console.log(
            "Error creating a new campaign on the database. Error: ",
            e
          );
        });
      this.campaigns.push(dbCampaign);
      console.log("Campaign created successfully on the database.");
    }

    if (!localCampaign) {
      this.campaigns.push(dbCampaign);
    }
    return dbCampaign;
  };

  updateCampaignsFromDB = async () => {
    const campaigns = await Campaign.find();
    if (!campaigns || campaigns.length === 0) {
      console.log("There's no campaigns on database.");
      return;
    }
    if (this.campaigns === campaigns) {
      console.log("There's no need to update.");
      return;
    }
    console.log("Updated campaigns successfully");
    this.campaigns = campaigns;
  };

  addPlayer = async (campaignId, userId, nickname) => {
    const localCampaign = await this.campaigns.find(c => c._id === campaignId);
    if (!userId) {
      return;
    }

    let player = await Player.findOne({ discordUser: userId });
    if (!player) {
      player = await new Player({
        discordUser: userId,
        name: nickname,
        characters: []
      }).save()
    }

    await localCampaign.players.push(userId)
    await Campaign.findByIdAndUpdate(localCampaign._id, { $set: { players: localCampaign.players } }, { useFindAndModify: true });
  }

  findCampaignByTitle = async (title, user) => {
    const campaign = await this.campaigns.find((c) => {
      if (c.title.toLowerCase() == title.toLowerCase()) {
        return c;
      }
      return null;
    });
    if (campaign) {
      return campaign;
    }
    return null;
  };

  deleteCampaign(campaign) {
    console.log(`Deleting "${campaign.title}" campaign from database...`);
    Campaign.findOneAndDelete({ _id: campaign._id }).then((_) =>
      console.log("Deleted from database.")
    );
    this.campaigns.splice(campaign);
    console.log("Deleted local reference.");
  }
};
