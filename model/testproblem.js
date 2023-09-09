const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");


const TestProblem = sq.define("testproblem", {
    testproblem_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },   
    

  });


module.exports = TestProblem;
