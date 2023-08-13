const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
const Auth =require("./auth")

const Subscription = sq.define("subscription", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    fee: {
        type: Sequelize.STRING
    },
   
    logo:{
        type: Sequelize.STRING
    }

  });

  
//   Subscription.hasMany(Auth, {
//     foreignKey: 'sub_id', // This will be the foreign key in the 'Course' model
//     // This will delete associated courses when a teacher is deleted
//   });

  
  
//   Auth.belongsTo(Subscription, {
//         foreignKey: 'sub_id', // This should match the foreign key defined in the 'Teacher' model
     
    
//     });


  module.exports = Subscription;
