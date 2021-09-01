const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.hotels = require("./hotel.model")(sequelize,Sequelize);
db.admins = require("./admin.model")(sequelize,Sequelize);
db.rooms = require("./room.model")(sequelize,Sequelize);
module.exports = db;