var Sequelize = require('sequelize');
var sequelize = require('../config/connection.js');

var User = db.define("User", {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}),

var Goals = db.define("Goals", {


});
