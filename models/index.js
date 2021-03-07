const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("blog_db", "bloger", "1111", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const db = {};

db.sequelize = sequelize;

db.multer = require("./multer.js")(sequelize, DataTypes);

module.exports = db;
