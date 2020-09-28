const sequelize = require("sequelize");
const db = require('../db/db')
const Notifycation = db.define("notifycations", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {type: sequelize.STRING},
  text: {type: sequelize.TEXT},
  date: {type: sequelize.DATE},
  event: {type: sequelize.ENUM, values:['default','claim','timeline','user'], defaultValue: 'default'},
  recipients: {type: sequelize.JSON},
  read: {type: sequelize.JSON},
})
module.exports = Notifycation