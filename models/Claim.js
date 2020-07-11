const Sequelize = require("sequelize");
const sequelize = require('../db')
const User = require('./User')
const Timeline = require('./Timeline')
const Claim = sequelize.define("claim", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  creatorId: {type: Sequelize.STRING, allowNull: false},
  filesPath: {type: Sequelize.JSON},
  answerFiles: { type: Sequelize.JSON },
  description: {type: Sequelize.TEXT, allowNull: false},
  status: { type: Sequelize.ENUM, values: ['Не обработанные', 'В работе', 'Обработанные'], defaultValue: 'Не обработанные', allowNull: false},
  address: {type: Sequelize.STRING, allowNull: false},
  creationDate: {
    type: Sequelize.DATE, 
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  departmentId: {type: Sequelize.INTEGER, allowNull: false},
  responsibleId: {type: Sequelize.STRING, allowNull: false},
  answerDescription: { type: Sequelize.TEXT, allowNull: false }
})
Claim.hasMany(Timeline, { onDelete: "cascade"});
module.exports = Claim