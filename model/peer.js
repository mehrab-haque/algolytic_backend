const { sq } = require("../repository/base");
const Problem =require('./problem')
const { DataTypes, Sequelize } = require("sequelize");


const Peer = sq.define("peer", {
    peer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    

  });

  Problem.hasMany(Peer,{

    foreignKey:'problem_id',
    onDelete:'CASCADE'
    
      });
          
     Peer.belongsTo(Problem,{
    
        foreignKey:'problem_id',
        onDelete:'CASCADE'
        
        }); 

module.exports = Peer;
