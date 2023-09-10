const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");
const Subscription=require('./subscription')
const Peer=require('./peer')
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
  

  });
  //commesdsd

  Subscription.hasMany(Auth, {
    foreignKey: 'sub_id', // This will be the foreign key in the 'Course' model
    // This will delete associated courses when a teacher is deleted
    //he
  });



  Auth.belongsTo(Subscription, {
    foreignKey: 'sub_id', // This should match the foreign key defined in the 'Teacher' model
 

});

Auth.belongsToMany(Auth,{as: 'children', foreignKey: 'from' , through: Peer });
Auth.belongsToMany(Auth,{as: 'parent', foreignKey: 'to' , through: Peer });

module.exports = Auth;
