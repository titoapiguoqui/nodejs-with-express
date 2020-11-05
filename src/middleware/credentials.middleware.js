// loads variables
const { vars } = require('../config');

// handle the logic in signup, login pages
// when username or password field is empty
module.exports = (req, res, next) => {
    // getting username and password from req.body
    var username = req.body.username,
        password = req.body.password;

    // check if username or password is empty
    if (!username || ! password) {
        // check ir url is login or signup
        if (req.originalUrl === '/login') {
            req.flash('loginMessage', 'Missing credentials.');

            // render login page with error data
            res.render('login.ejs', {
                siteTitle: vars.appName,
                pageTitle: ' - Login',
                description: 'NODE JS LOGIN',
                urlCanonical: 'http://' + req.headers.host + req.originalUrl,
                message: req.flash('loginMessage'),
                user: req.user
            });
        } else {
            req.flash('signupMessage', 'Missing credentials.');

            // render signup page with error data
            res.render('signup.ejs', {
                siteTitle: vars.appName,
                pageTitle: ' - Signup',
                description: 'NODE JS LOGIN',
                urlCanonical: 'http://' + req.headers.host + req.originalUrl,
                message: req.flash('signupMessage'),
                user: req.user
            });
        }
    } else {
        next(); // if user and password doesn't empty, continue
    }
};