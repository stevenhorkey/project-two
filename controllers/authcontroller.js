var exports = module.exports = {}

//This file is essentially a model page for which handlebars files to render for 
//our authentication and includes a logout function

exports.signup = function (req, res) {

    res.render('index', {layout:'login'});

}

exports.signin = function (req, res) {

    res.render('index');

}

exports.dashboard = function (req, res) {

    res.render('profile');

}

exports.wall = function (req, res) {
    res.render('wall');
}

exports.search = function (req, res) {

    res.render('search');

}

exports.peers = function (req, res) {

    res.render('peers');
}

exports.friends = function (req, res) {

    res.render('friends');
}

exports.logout = function (req, res) {
    //This ends the current user session which is key to authentication
    req.session.destroy(function (err) {
        //sends user back to the signup/login page
        res.render('index');
    });

}

