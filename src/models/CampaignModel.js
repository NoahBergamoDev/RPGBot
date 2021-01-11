const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  serverId: { type: String, require: true },
  createdByDiscordID: { type: String, require: true },
  server: { type: ObjectId, require: true },
  ruleSystemID: { type: String, require: true },
  title: { type: String, require: true },
  maxPlayers: { type: Number, require: true },
  players: { type: Array, require: true },
  dmID: { type: String, require: true },
});
module.exports = mongoose.model("Campaign", CampaignSchema);
