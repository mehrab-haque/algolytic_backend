const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
const Problem=require('./problem')
const Auth=require('./auth')

const Submission = sq.define("submission", {
    submission_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
 

    verdict: {
        type: Sequelize.STRING
    },
    solution: {
        type: Sequelize.STRING(5000)         
    },
    submission_time:{
        type: Sequelize.DATE
    },
    language:{
        type: Sequelize.STRING
    },
    time:{
        type: Sequelize.DOUBLE
    },
    memory:{
        type: Sequelize.INTEGER
    }     
    

  });
 
  Problem.hasMany(Submission,{

foreignKey:'problem_id',
onDelete:'CASCADE'

  });
      
Submission.belongsTo(Problem,{
    
foreignKey:'problem_id',
onDelete:'CASCADE'

}); 

 Auth.hasMany(Submission,{

    foreignKey:'user_id',
    onDelete:'CASCADE'
    
      });
                 

Submission.belongsTo(Auth,{

    foreignKey:'user_id',
onDelete:'CASCADE'
  });  


 
    

   



  module.exports = Submission;
