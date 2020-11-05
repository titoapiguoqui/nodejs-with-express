// load modules necessaries
const LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    { connection } = require('.');

// export passport functions
module.exports = function (passport) {
    // =========================================================================
    // SESSION SETUP ===========================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session: stores user in session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user: retrieves user from session
    passport.deserializeUser(function (id, done) {
        connection.pool.query(
            "SELECT * FROM users WHERE id = ?", [id],
            function (err, user) {
                if (err) return done(err);
                done(err, user[0]);
            }
        );
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists
            connection.pool.query(
                "SELECT * FROM users WHERE username = ?", [username],
                function (err, user) {
                    if (err) return done(err);

                    // check if user exists
                    if (user.length) {  // if user exists, render signup with req.flash message
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {    // if user with that username not exists
                        // create the new user
                        var newUser = {
                            username: username,
                            password: bcrypt.hashSync(password, 10),  // use the generateHash function in our user model
                            role: 'user'
                        };

                        // create insert query
                        var insertQuery = "INSERT INTO users ( username, password, role ) " +
                                        "values (?,?,?)";

                        // insert the new user in database
                        connection.pool.query(
                            insertQuery,
                            [newUser.username, newUser.password, newUser.role],
                            function (err, user) {
                                if (err) return done(err);
                                newUser.id = user.insertId;
                                return done(null, newUser);
                            }
                        );
                    }
                }
            );
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with username and password from our form
            // find a user whose username is the same as the forms username
            connection.pool.query(
                "SELECT * FROM users WHERE username = ?", [username],
                function (err, user) {
                    if (err) return done(err);

                    // check if user exists
                    if (!user.length) { // if user not exists, render login with req.flash message
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong user or password.')); // req.flash is the way to set flash data using connect-flash
                    }

                    // check if password is correct
                    if (!bcrypt.compareSync(password, user[0].password)) { // if the user is found but the password is wrong, render login with req.flash message
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong user or password.')); // create the loginMessage and save it to session as flash data
                    }

                    console.log('User ' + user[0].username.toUpperCase() + ' with role ' +
                        user[0].role.toUpperCase() + ' has been login successfully');

                    // all is well, return successful user
                    return done(null, user[0]);
                }
            );
        }));
}