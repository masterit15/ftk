const sequelize = require("sequelize");
const db = require('../db')
const refreshToken = db.define("refreshToken", {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    refreshToken: { type: sequelize.STRING, allowNull: false},
  })
module.exports = refreshToken