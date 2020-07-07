const Sequelize = require("sequelize");
const sequelize = require('../db')
const User = require('./User')
const Claim = require('./Claim')
const Departament = sequelize.define("departament", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {type: Sequelize.STRING, allowNull: false},
})
Departament.hasMany(Claim, { onDelete: "cascade"});
Departament.hasMany(User);
module.exports = Departament