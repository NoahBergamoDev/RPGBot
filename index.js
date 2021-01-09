const Database = require("./src/database/Database");
const ServerController = require("./src/controllers/ServerController");

const db = new Database();
db.connectDatabase();

const serverController = new ServerController(db);
const bot = require("./src/bot/RPGBot");
bot({serverController});
