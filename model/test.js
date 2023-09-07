const { sq } = require("../repository/base");
const Problem =require('./problem')
const Tag =require('./tag')
const Auth =require('./auth')
const { DataTypes, Sequelize } = require("sequelize");
const TestProblem = require("./testproblem");
const TestTag = require("./testtag");


const Test = sq.define("test", {
    test_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    submission_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE.NOW   
    },
    marks: {
      type: Sequelize.DOUBLE     
    }  
    

  });
  
        
Test.belongsToMany(Problem,{foreignKey: 'testid' , through: TestProblem });
Problem.belongsToMany(Test,{ foreignKey: 'problemid' , through: TestProblem });

Test.belongsToMany(Tag,{ foreignKey: 'testid' , through: TestTag });
Tag.belongsToMany(Test,{ foreignKey: 'tagid' , through: TestTag });

Auth.hasMany(Test,{

    foreignKey:'id',
    onDelete:'CASCADE'
    
      });
          
Test.belongsTo(Auth,{

foreignKey:'id',
onDelete:'CASCADE'

}); 

module.exports = Test;