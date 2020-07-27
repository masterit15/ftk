const sequelize = require("sequelize");
const db = require('../db')
const MessagesStatus = db.define("messagessatus", {
  read: {type: sequelize.BOOLEAN},
  notified: {type: sequelize.BOOLEAN}
})
module.exports = MessagesStatus