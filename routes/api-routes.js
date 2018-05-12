var db = require("../models");
//var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

//var Sequelize = require('sequelize');

const Op = require('sequelize').Op;

//function for authentication, allwing onky logged in users to access the site. Redirects to the signin/signup page
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/auth');

}

module.exports = function (app) {
    //This handles the get request for the current users profile page
    app.get("/profile", isLoggedIn, function (req, res) {
        console.log(req.user);
        //sequelize function to findall of goals in database where conditions are met
        db.Goal.findAll({
            where: {
                //only provides users who belong to current sessions user
                //passport sends session data in every request as req.user
                UserId: req.user.id
            }
        }).then(function (dbGoal) {
            //Object to send to the handlebars file
            var hbObject = {
                //has all matching goals from search
                goals: dbGoal,
                //current session's user
                user: req.user
            };
            //console.log for test
            console.log(hbObject.goals)
            //renders handlebars profile page and gives hbObject to file to handlebars to generate goals and user info
            res.render("profile", hbObject);
        });

    });
    //this handles the get requests for searches, the :name is provided on the client side search.js file
    app.get("/search/:name", isLoggedIn, (req, res) => {
        console.log("recieved request")
        //sequelize function to find all users that match params
        db.User.findAll({
            where: {
                [Op.and]: {
                    firstName: req.params.name,
                    id: {
                        [Op.ne]: req.user.id
                    }
                }
                //only finds users that have a first name of whatever name was searched  
            }
        }).then(dbUser => {
            //provides an object to send to handlebars with the searched users data
            let hbObject = {
                user: req.user,
                users: dbUser
            };
            //load the search handlebars file and pass it the hbObject to provide a list of matched users
            res.render("search", hbObject);
        })
    })
    //this function handles the users request to view a different user profile  
    app.get("/peer/:id", isLoggedIn, function (req, res) {
        var hbObject = {};
        //console.log to confirm the request has been sent
        console.log("received request for profile/" + req.params.id);
        //sequelize function to find the one matching user based off of user id
        db.User.findOne({
            //this is the condition for the user
            where: {
                id: req.params.id
            }

        }).then(function (dbUser) {
            hbObject['users'] = dbUser;
            db.Goal.findAll({
                where: {
                    UserId: dbUser.id
                }
            }).then(function (dbGoal) {
                hbObject['goals'] = dbGoal;
                hbObject['user'] = req.user;
                // console.log('hbObject is' + JSON.stringify(hbObject));
                res.render('peers', hbObject)
            })
            //render the visitProfile handlebars page sending the hbObject to find
        })
    });
    app.get("/friends", isLoggedIn, function (req, res) {
        let userId = req.user.id;
        db.Friend.findAll({
            where: {
                UserId: userId
            }
        }).then(function (data) {
            let followList = data.map(user => user.friend_id);
            console.log(followList)
            db.User.findAll({
                where: {
                    id: {
                        [Op.in]: followList
                    }
                }
            })
                .then(function (dbFriend) {
                    console.log(dbFriend);
                    let hbObject = {
                        users: dbFriend
                    }
                    res.render('friends', hbObject);
                })
        })
    });

    //this function handles the request to create a new goal
    app.post("/api/goals", function (req, res) {
        //req.body is equal to the data we sent in the ajax call on search.js
        var newGoal = req.body;
        //creating a new key called UserId in the object and giving that key a value of the session users id in the database
        newGoal['UserId'] = req.user.id
        //creates a new goal in the database
        db.Goal.create(newGoal).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });
    //this function handles the request to change a goal to completed
    app.put("/api/goals/:id", function (req, res) {
        //updates the Goals table with completed: true
        db.Goal.update(
            //req body matches the toggleBool object from site.js
            req.body,
            {
                //condition for the matching goal
                where: {
                    id: req.params.id
                }
            }
        ).then(function (dbGoal) {
            //return json of the goal
            res.json(dbGoal);
        });
    });
    //this function is for handling the request to change a profile picture img src url
    app.put("/api/profile", function (req, res) {

        db.User.update(
            //this is the new profile url
            req.body,
            {
                where: {
                    //specific user primary key id
                    id: req.user.id
                }
            }
        ).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    //this handles deleting all of the completer goals
    app.delete("/api/goals", function (req, res) {
        console.log(req.user.id);
        db.Goal.destroy({
            where: {
                //req.user.id is the current sessions user id
                UserId: req.user.id,
                //completed is a boolean value in the users table
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
    app.post('/friends', function (req, res) {
        var hbObject = req.body;
        console.log(hbObject);
        hbObject['UserId'] = req.user.id
        db.Friend.create(hbObject).then(function (dbFriend) {
            res.json(dbFriend);
        })
    })
}
