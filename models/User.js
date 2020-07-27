const sequelize = require("sequelize");
const db = require('../db/db')
const Claims = require('./Claim')
const Timeline = require('../models/Timeline')
const Chat = require('../models/Chat')
const Roster = require('../models/Roster')
const Message = require('../models/Message')
const MessageStatus = require('../models/MessageStatus')
const User = db.define("user", {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: { type: sequelize.STRING, allowNull: true},
    login: { type: sequelize.STRING, allowNull: false},
    // avatar: { type: Sequelize.TEXT, allowNull: false},
    // permission: {type: Sequelize.ENUM, values:['Администратор','Сотрудник'], defaultValue: 'Сотрудник'},
    username: { type: sequelize.STRING, allowNull: false},
    password: { type: sequelize.STRING, allowNull: false},
    subscription: { type: sequelize.JSON, allowNull: true}
  })

  User.hasMany(Timeline, { onDelete: "cascade"});
  User.hasMany(Chat, { onDelete: "cascade"});
  User.hasMany(Roster, { onDelete: "cascade"});
  Roster.belongsTo(User)
  User.hasMany(Message, { onDelete: "cascade"});
  User.hasMany(MessageStatus, { onDelete: "cascade"});
  User.hasMany(Claims);
module.exports = User