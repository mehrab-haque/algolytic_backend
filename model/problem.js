const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
const Submission =require("./submission")

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
    creation_time:{
        type: Sequelize.DATE
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

 Problem.hasMany(Submission, {
    foreignKey: 'problem_id', // This will be the foreign key in the 'Course' model
    onDelete: 'CASCADE', // This will delete associated courses when a teacher is deleted
  });
  
  Submission.belongsTo(Problem, {
    foreignKey: 'problem_id', // This should match the foreign key defined in the 'Teacher' model
  });

  Problem.sync().catch(err=>{
    console.log(err)
  })

  module.exports = Problem;
