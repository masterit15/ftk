const Sequelize = require("sequelize");
const sequelize = require('../db')
const Claim = require('./Claim')
const Status = sequelize.define("status", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {type: Sequelize.STRING, allowNull: false},
  color: {type: Sequelize.STRING, allowNull: false},
})
Status.hasMany(Claim, { onDelete: "cascade"});
module.exports = Status