const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");

const Auth = sq.define("auth", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    login:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING
    }
  });

  Auth.sync().catch(err=>{
    console.log(err)
  })

  module.exports = Auth;
