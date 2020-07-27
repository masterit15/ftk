const sequelize = require("sequelize");
const db = require('../db/db')
const Roster = require('../models/Roster')
const Message = require('../models/Message')
const Chat = db.define("chat", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {type: sequelize.STRING, allowNull: false},
  type: {type: sequelize.ENUM, values:['privat', 'public', 'group'], defaultValue: 'privat'}
})
Chat.hasMany(Roster, { onDelete: "cascade"});
Chat.hasMany(Message, { onDelete: "cascade"});
module.exports = Chat