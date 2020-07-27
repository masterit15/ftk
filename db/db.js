const sequelize = require("sequelize");
const config = require('config')
const DBname = config.get('DBname')
const DBlogin = config.get('DBlogin')
const DBpassword = config.get('DBpassword')
const DBhost = config.get('DBhost')
const DBport = config.get('DBport')

const db = new sequelize(DBname, DBlogin, DBpassword, {
  dialect: "mysql",
  host: DBhost,
  port: DBport,
  define: {
    timestamps: false
  },
  logging: false
});
db.sync().then(result=>{
  // console.log(result);
})
.catch(err=> {
  console.log(err)
});
module.exports = db;
