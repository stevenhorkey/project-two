var db = require("../models");

module.exports = function (app) {
var db = require("../models");
var passId = require("../config/passport/passport.js")

module.exports = function (app) {

   app.post("/api/goals", function(req, res) {
       req.body.userId = passId.userId;
       db.Goal.create(req.body).then(function(dbGoal) {
           res.json(dbGoal);
       });
   });

};

    app.post("/api/goals", function(req, res) {
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });

};