var db = require("../models");
var paddId = require('../config/passport/passport')

module.exports = function (app) {
    console.log(db)
    console.log(db.Goal)
    app.post("/api/goals", function(req, res) {
        req.body.userId = passId.userId;
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });

};