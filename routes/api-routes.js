var db = require("../models");
//var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {

    app.get("/profile", isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/auth');
 
}