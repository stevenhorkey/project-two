var db = require("../models");
//var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

//function for authentication, allwing onky logged in users to access the site. Redirects to the signin/signup page
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/auth');

}

module.exports = function (app) {

    app.get("/profile", isLoggedIn, function (req, res) {
        console.log(req.user);
        db.Goal.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbGoal) {
            var hbObject = {
                goals: dbGoal,
                users: req.user
            };
            console.log(hbObject.goals)
            res.render("profile", hbObject);
        });

    });


    app.get("/search/:name", (req, res) => {
        db.User.findAll({
            where: {
                firstName: req.params.name
            }
        }).then(dbUser => {
            let hbObject = {
                users: dbUser
            };
            res.render("search", hbObject);
        })
    })

    app.post("/api/goals", function (req, res) {
        var newGoal = req.body;
        newGoal['UserId'] = req.user.id
        db.Goal.create(newGoal).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });
    app.put("/api/goals/:id", function (req, res) {

        db.Goal.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });
    app.delete("/api/goals", function (req, res) {
        console.log(req.user.id);
        db.Goal.destroy({
            where: {
                UserId: req.user.id,
                completed: true
            }
        }).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });
    //The delete call removes a goal from the goal list in the profile page. This completely removes it from the table
    //and then sends Json data
    app.delete("/api/goals/:id", function (req, res) {
        db.Goal.destroy({
            where: {
                //id of goal
                id: req.params.id
            }
        }).then(function (dbGoal) {

            res.json(dbGoal);
        });
    });
}