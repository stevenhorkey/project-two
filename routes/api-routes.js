var db = require("../models");

module.exports = function (app) {

    app.post("/api/goals", function(req, res) {
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });

};