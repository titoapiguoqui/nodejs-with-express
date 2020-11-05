// loads variables
const { vars } = require("../config");

// handle the logic in signup, login and logout pages
class AuthController {
    // render signup page if user is in request
    signup(req, res) {
        // check if user is in request
        if (!req.user) {
            res.render('signup.ejs', {
                siteTitle: vars.appName,
                pageTitle: ' - Signup',
                description: 'NODE JS LOGIN',
                urlCanonical: 'http://' + req.headers.host + req.originalUrl,
                message: req.flash('signupMessage'),
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    }

    // render login page if user is in request
    login(req, res) {
        // check if user is in request
        if (!req.user) {
            res.render('login.ejs', {
                siteTitle: vars.appName,
                pageTitle: ' - Login',
                description: 'NODE JS SIGNUP',
                urlCanonical: 'http://' + req.headers.host + req.originalUrl,
                message: req.flash('loginMessage'),
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    }

    // destroy session in request to do logout
    logout(req, res) {
        req.session.destroy(function (err) {
            if (err) console.log(err);
            else res.redirect('/');
        });
    }
}

module.exports = new AuthController();