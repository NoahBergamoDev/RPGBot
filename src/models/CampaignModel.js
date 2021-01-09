const { Schema } = require("mongoose");

const CampaignSchema = new Schema({
  createdByDiscordID: String,
  ruleSystemID: String,
  title: String,
  maxPlayers: Number,
  players: Array,
  dmID: String,
});
module.exports = mongoose.model("Campaign", CampaignSchema);
