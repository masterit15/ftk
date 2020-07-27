const sequelize = require("sequelize");
const db = require('../db')
const MessageStatus = require('../models/MessageStatus')
const Message = db.define("messages", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  text: {type: sequelize.TEXT},
  timestamp: {type: sequelize.DATE}
})
Message.hasMany(MessageStatus, { onDelete: "cascade"});
module.exports = Message