const mongoose = require("mongoose");
const { Schema } = mongoose;
const PlayerSchema = new Schema({
  discordUser: Object,
  name: String,
  characters: Array,
});
module.exports = mongoose.model("Player", PlayerSchema);
