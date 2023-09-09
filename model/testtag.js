const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");


const TestTag = sq.define("testtag", {
    testtag_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },   
    

  });


module.exports = TestTag;
