const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");

const Submission = sq.define("submission", {
    submission_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    problem_id: {
        type: Sequelize.INTEGER
    },
    verdict: {
        type: Sequelize.STRING
    },
    solution: {
        type: Sequelize.STRING         
    },
    submission_time:{
        type: Sequelize.DATE
    },
    language:{
        type: Sequelize.STRING
    }   ,
    

  });

  Submission.sync().catch(err=>{
    console.log(err)
  })

  module.exports = Submission;
