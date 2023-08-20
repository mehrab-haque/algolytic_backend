const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
const Problem=require('./problem')


const Solution = sq.define("solution", {
    solution_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
 

   
    solution: {
        type: Sequelize.STRING (5000)        
    },

    language:{
        type: Sequelize.STRING
    }   
    

  });
 
  Problem.hasMany(Solution,{

foreignKey:'problem_id',
onDelete:'CASCADE'

  });
      
Solution.belongsTo(Problem,{
    
foreignKey:'problem_id',
onDelete:'CASCADE'

}); 


                


 
    

   



  module.exports = Solution;
