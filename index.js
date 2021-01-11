const Database = require("./src/database/Database");
const ServerController = require("./src/controllers/ServerController");
const CampaignController = require("./src/controllers/CampaignController");

const db = new Database();
db.connectDatabase();

const serverController = new ServerController();
const campaignController = new CampaignController();
const bot = require("./src/bot/RPGBot");
bot({ serverController, campaignController });
