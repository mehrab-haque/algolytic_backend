const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");




const Dummy = sq.define("dummy", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    },    

  });
  

  module.exports = Dummy;
