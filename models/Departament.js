const sequelize = require("sequelize");
const db = require('../db/db')
const User = require('./User')
const Claim = require('./Claim')
const Departament = db.define("departament", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {type: sequelize.STRING, allowNull: false},
})
Departament.hasMany(Claim, { onDelete: "cascade"});
Departament.hasMany(User);
module.exports = Departament