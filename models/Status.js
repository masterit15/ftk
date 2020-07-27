const sequelize = require("sequelize");
const db = require('../db')
const Claim = require('./Claim')
const Status = db.define("status", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {type: sequelize.STRING, allowNull: false},
  color: {type: sequelize.STRING, allowNull: false},
})
Status.hasMany(Claim, { onDelete: "cascade"});
module.exports = Status