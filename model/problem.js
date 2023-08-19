const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");




const Problem = sq.define("problem", {
    problem_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    isLive: {
        type: Sequelize.INTEGER
    },
    isPremium: {
        type: Sequelize.INTEGER
    },
    author_id: {
        type: Sequelize.STRING         
    },

    response_time:{
        type: Sequelize.INTEGER
    },
    data_json:{
        type: Sequelize.JSON
    },
    logo:{
        type: Sequelize.STRING
    },
    difficulty:{
        type: Sequelize.STRING 
    },
    tag:{
        type: Sequelize.STRING 
    },
    acceptance:{
        type: Sequelize.STRING
    }

  });

  

  module.exports = Problem;
