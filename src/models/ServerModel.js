const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelName = "Servers";

const ServerSchema = new Schema({
  serverName: { type: String, require: true },
  serverId: { type: String, require: true },
  addedDate: { type: Date, require: true },
  campaigns: [{ type: Schema.ObjectId, ref: "Campaign" }],
});

module.exports = mongoose.model(modelName, ServerSchema)
