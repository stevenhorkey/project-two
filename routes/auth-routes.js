var path = require("path");
var db = require("../models");
var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {

    app.get('/auth', notLoggedIn, authController.signup);

    app.get('/profile', isLoggedIn, authController.dashboard);

    app.get('/wall', isLoggedIn, authController.wall);

    app.get('/logout', notLoggedIn, authController.logout);

    app.get("/search", isLoggedIn, authController.search);

    app.get("/peer", isLoggedIn, authController.peers);

    app.get("/friends", isLoggedIn, authController.friends);

    // app.get("*", isLoggedIn, authController.dashboard);

    //These signup and signin posts use passport.js file to either setup an account or log in to there account.

    app.post('/signup', passport.authenticate('local-signup', {
        //on success redirect user to profile handlebars
        successRedirect: '/profile',
        //on failure redirect users back to the login/signup page
        failureRedirect: '/auth'
    })
    )

    app.post('/signin', passport.authenticate('local-signin', {
        //on success redirect user to profile handlebars
        successRedirect: '/profile',
        //on failure redirect users back to the login/signup page
        failureRedirect: '/auth'
    }

    ));
    //This is the isLoggedIn function used for the get requests
    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('/auth');

    }

    function notLoggedIn(req, res, next) {
        if (!req.isAuthenticated())

            return next();

        res.redirect('/profile');
    }

    //This function gets the session data for the user and gets there id
    app.get('/api/user_data', function (req, res) {

        if (req.user === undefined) {
            // The user is not logged in
            res.json({});
        } else {
            //User is logged in
            res.json({
                //sedns userId
                userId: req.user.id
            });
        }
        app.get('/api/user_data', function (req, res) {

            if (req.user === undefined) {
                // The user is not logged in
                res.json({});
            } else {
                res.json({
                    userId: req.user.id
                });
            }
        });
    })

}