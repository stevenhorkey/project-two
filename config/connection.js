var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var db = new Sequelize("goals_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

console.log('Successfully connected to the DB!');
// Exports the connection for other files to use
module.exports = sequelize;