var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
//sets the User variable to equal the current user in session
 var User = user;
 console.log(User);
 //This is the strategy we will be using, this is installed ed as an npm package
 var LocalStrategy = require('passport-local').Strategy;
 //This is set for later use
 var userId;

 passport.use('local-signup', new LocalStrategy(
 
    {
        //'email' and 'password' are ids in the signup form
        usernameField: 'username',
        passwordField: 'password',
        //emailField: 'email',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },

    function(req, username, password, done) {

        var toCaps = function(word) {
            var splitWordArray = word.split('');
            var newCapsWord = splitWordArray[0].toUpperCase();
            splitWordArray[0] = newCapsWord;
            var finalWord =splitWordArray.join('');
            return finalWord;
        }

        var generateHash = function(password) {
            //This handles the encryption of the users password
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
         
        };
        //Sequelize function
        User.findOne({
            where: {
                //finds user based on email                userName: username,
                userName: username
            }
        //This then function ensures that if there is already a matching email, the account cant be created
        }).then(function(user) {
         
            if (user)
         
            {
         
                return done(null, false, {
                    message: 'That username or email is already taken'
                });
         
            } else
         
            {
                //runs userPassword thorugh encryption
                var userPassword = generateHash(password);
         //These are the entries for the database
                var data =
         
                    {
                        email: req.body.email,
         
                        password: userPassword,
         
                        firstName: req.body.firstname,
         
                        lastName: req.body.lastname,

                        userName: req.body.username
         
                    };
         
                //pass the entries into a create Sequelize fuction
                User.create(data).then(function(newUser, created) {
         
                    if (!newUser) {
         
                        return done(null, false);
         
                    }
         
                    if (newUser) {
         
                        return done(null, newUser);
         
                    }
         
                });
         
            }
         
        });
    }
 
));

passport.use('local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'username',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, username, password, done) {
 
        var User = user;
        
        //function checks if the password in the database matches the user-inputted password to login
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
        //Sequelize function to find matching email in the Users table
        User.findOne({
            where: {
                userName: username
            }
        }).then(function(user) {
 
            if (!user) {
                //if there is no matching email in the Users table do not allow login and alert the user
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
            
            if (!isValidPassword(user.password, password)) {
                //if the password does not match the database password, do not let user log in and alert them
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
            
            var userinfo = user.get();
            return done(null, userinfo);
 
            //Error Handling
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));

//serialize
passport.serializeUser(function(user, done) {
 
    done(null, user.id);
 
});

passport.deserializeUser(function(id, done) {
 
    User.findById(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
            // console.log(id);
            // userId = id;

        } else {
 
            done(user.errors, null);
            
        }
 
    });
 
});

}
