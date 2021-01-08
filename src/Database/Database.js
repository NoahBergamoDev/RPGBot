const config = require("../../config.json");
const { MongoClient } = require("mongodb");

module.exports = class Database {
  constructor() {
    this.client = new MongoClient(config.databaseClientUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  }

  async connectDatabase() {
      if(!this.client){
          console.log("There's no client (server) running.")
          return
      }
    try {
      await this.client.connect();
      this.db = this.client.db(config.databaseName);
      await this.db.command({ ping: 1 });
      console.log("Connected successfully to the server");
    } catch (_) {
      this.client.close();
      console.log("Could not connect to the server");
    }
  }
};
