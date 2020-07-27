const sequelize = require("sequelize");
const db = require('../db')
const Timeline = db.define("timeline", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  event: {type: sequelize.ENUM, values:['comment','edited', 'changestatus', 'created'], defaultValue: 'comment'},
  text: {type: sequelize.TEXT, allowNull: true},
  file: {type: sequelize.JSON, allowNull: true},
  time: {type: sequelize.DATE, defaultValue: sequelize.NOW},
  autor: {type: sequelize.STRING, allowNull: true}
})

module.exports = Timeline