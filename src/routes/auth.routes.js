// getting necessary controllers and middleware
const { AuthController } = require("../controllers"),
    { isEmptyCredentials } = require("../middleware");

// serving authentication routes
module.exports = function auth(server, passport) {
    server.get('/signup', AuthController.signup);
    server.post('/signup', isEmptyCredentials, passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    server.get('/login', AuthController.login);
    server.post('/login', isEmptyCredentials, passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    server.get('/logout', AuthController.logout);
};