const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    ssl: true,
    dialect: process.env.DB_TYPE,
    dialectOptions: {
        ssl: {
           rejectUnauthorized: false,
        }
    },
    logging: false
  })

// const dbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };

class Repository{
    constructor() {}
}

module.exports = { sq: sequelize,Repository };