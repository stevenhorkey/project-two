var path = require("path");
var db = require("../models");
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {
    app.get('/auth', authController.authorization);
};