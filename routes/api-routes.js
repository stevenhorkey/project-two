var db = require("../models");

module.exports = function (app) {

    app.get("/profile", function(req, res) {
        db.Goal.findAll({}).then(function(dbGoal) {
            var hbObject = {
                goals : dbGoal
            };
            res.render("profile", hbObject);
        });
    });
    app.post("/api/goals", function(req, res) {
        
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });

};