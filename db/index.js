const Sequelize = require("sequelize");
const sequelize = new Sequelize("ftk", "root", "root", {
  dialect: "mysql",
  host: "127.0.0.1",
  define: {
    timestamps: false
  },
  logging: false
});
// sequelize.sync().then(result=>{
//   console.log(result);
// })
// .catch(err=> {
//   console.log(err)
// });
module.exports = sequelize;
