var path = require("path");
var db = require("../models");
var passport = require('passport');
var authController = require('../controllers/authcontroller.js');

module.exports = function (app) {
//These are our actual get routes, these include an address for the get request as well
//as a function from the authController file to determine what to render
//isLogged in is a function that ensures users to be logged in before they can visit these pages
app.get('/auth', authController.signup);

app.get('/profile', isLoggedIn, authController.dashboard);

app.get('/wall', isLoggedIn, authController.wall);

app.get('/logout', authController.logout);

//app.get('/signup', authController.authorization);

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
         
    res.redirect('/auth');
 
}

//This function gets the session data for the user and gets there id
app.get('/api/user_data', function(req, res) {

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
});
}


