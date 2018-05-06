var db = require("../models");


module.exports = function (app) {
    console.log(db)
    console.log(db.Goal)
    app.post("/api/goals", function(req, res) {
        
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });

};