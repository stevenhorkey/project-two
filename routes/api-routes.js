var db = require("../models");

module.exports = function (app) {

    app.get("/profile", function(req, res) {
        db.Goal.findAll({}).then(function(dbGoal) {
            var hbObject = {
                goals : dbGoal
            };
            console.log(hbObject)
            res.render("profile", hbObject);
        });
    });
    app.post("/api/goals", function(req, res) {
        
        db.Goal.create(req.body).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });
    app.put("/api/goals/:id", function(req, res) {
        
        db.Goal.update(
            req.body,
            {
                where:{
                    id: req.params.id
                }
            }
        ).then(function(dbGoal) {
            res.json(dbGoal);
        });
    });
    app.delete("/api/goals/", function(req, res) {
        db.Goal.destroy({
          where: {
            completed: true
          }
        }).then(function(dbGoal) {
          res.json(dbGoal);
        });
    });
    app.delete("/api/goals/:id", function(req, res) {
        db.Goal.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbGoal) {
          res.json(dbGoal);
        });
    });

};