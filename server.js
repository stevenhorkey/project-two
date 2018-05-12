var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var mysql2 = require('mysql2')
// var env = require('dotenv').load()
var exphbs = require('express-handlebars')
var PORT = process.env.PORT || 8080;
var db = require("./models");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views/')
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// var authRoute = require('./routes/auth-routes.js')(app, passport);
require('./routes/auth-routes')(app);


require('./config/passport/passport.js')(passport, db.User);

<<<<<<< HEAD
db.sequelize.sync({
  force: true
}).then(function () {
=======
db.sequelize.sync({}).then(function () {
>>>>>>> 2d89eadbbbca8556e131b375add00b28bf7cc636
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
