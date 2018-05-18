//imports various requirements
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
var path = require('path');
var favicon = require('serve-favicon');
var env = "secret";
var config = require(__dirname + "/config/config.json")[env];
console.log(config.use_secret);
//serves static assets from public folder
app.use(express.static("public"));
//set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
//session use
app.use(session({
  secret: config.use_secret,
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());
//handlebars setup
app.set('views', './views/')
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//importing routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);
require('./routes/auth-routes')(app);

//importing passport file
require('./config/passport/passport.js')(passport, db.User);
//synchronizing database then listening on server
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
