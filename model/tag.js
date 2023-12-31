const { sq } = require("../repository/base");
const { DataTypes, Sequelize } = require("sequelize");

const Tag = sq.define("tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
  });


  module.exports = Tag;
