const sequelize = require("sequelize");
const db = require('../db')
const Option = db.define("option", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {type: sequelize.STRING, allowNull: false},
  defaultcolor: {type: sequelize.STRING, allowNull: false},
  accentcolor: {type: sequelize.STRING, allowNull: false},
  dark: {type: sequelize.BOOLEAN, allowNull: false},
  background: {type: sequelize.STRING, allowNull: false},
  //selectstatus: {type: Sequelize.ENUM, values:['Все','Не обработан','В работе','Обработана'], defaultValue: 'Не обработан', allowNull: false},
})
module.exports = Option