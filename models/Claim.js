const sequelize = require("sequelize");
const db = require('../db')
const Timeline = require('./Timeline')
const Claim = db.define("claim", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  filesPath: {type: sequelize.JSON},
  answerFiles: { type: sequelize.JSON },
  description: {type: sequelize.TEXT, allowNull: false},
  status: { type: sequelize.ENUM, values: ['Не обработанные', 'В работе', 'Обработанные'], defaultValue: 'Не обработанные', allowNull: false},
  address: {type: sequelize.STRING, allowNull: false},
  departament: {type: sequelize.STRING, allowNull: false},
  createdUser: {type: sequelize.STRING, allowNull: false},
  creationDate: {
    type: sequelize.DATE, 
    allowNull: false,
    defaultValue: sequelize.NOW
  },
  controlDate: {
    type: sequelize.DATE, 
    allowNull: false,
  },
  responsibleId: {type: sequelize.INTEGER, allowNull: false},
  responsible: {type: sequelize.STRING, allowNull: false},
  answerDescription: { type: sequelize.TEXT, allowNull: false }
})
Claim.hasMany(Timeline, { onDelete: "cascade"});
module.exports = Claim