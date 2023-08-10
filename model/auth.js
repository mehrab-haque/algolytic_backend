const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
 const Submission =require("./submission")

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
    },
   sub_id: {
      type: Sequelize.INTEGER,
      defaultValue: 2        
  },

  });

 Auth.hasMany(Submission, {
    foreignKey: 'user_id', // This will be the foreign key in the 'Course' model
    onDelete: 'CASCADE', // This will delete associated courses when a teacher is deleted
  });
  
  Submission.belongsTo(Auth, {
    foreignKey: 'user_id', // This should match the foreign key defined in the 'Teacher' model
  });
  Auth.sync().catch(err=>{
    console.log(err)
  })

  module.exports = Auth;
