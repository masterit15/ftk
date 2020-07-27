const Sequelize = require("sequelize");
const config = require('config')
const DBname = config.get('DBname')
const DBlogin = config.get('DBlogin')
const DBpassword = config.get('DBpassword')
const DBhost = config.get('DBhost')
const DBport = config.get('DBport')

const sequelize = new Sequelize(DBname, DBlogin, DBpassword, {
  dialect: "mysql",
  host: DBhost,
  port: DBport,
  define: {
    timestamps: false
  },
  logging: false
});
sequelize.sync().then(result=>{
  // console.log(result);
})
.catch(err=> {
  console.log(err)
});
module.exports = sequelize;
