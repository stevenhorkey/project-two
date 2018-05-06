var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('index');
 
}

exports.signin = function(req, res) {
 
    res.render('index');
 
}

exports.dashboard = function(req, res) {
 
    res.render('profile');
 
}

exports.wall = function(req, res) {
    res.render('wall');
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.render('index');
 
    });
 
}