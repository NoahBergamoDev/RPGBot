const config = require("../config.json");
const mongoose = require("mongoose");

module.exports = class Database {
  constructor() {}

  connectDatabase = async () => {
    try {
      mongoose.Promise = global.Promise;
      mongoose
        .connect(config.databaseClientUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(async (resp) => {
          console.log("Connected successfully to the server");
          return resp;
        });
    } catch (e) {
      console.log("Could not connect to the server", e);
      if (this.client) this.client.close();
    }
  };

  async disconnectDatabase() {
    mongoose.disconnect();
  }
};
