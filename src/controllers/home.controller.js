// load variables and initialize data variable
const { vars } = require("../config");
let data = {};

// handle the logic in index, policies and auth pages
class HomeController {
    // render index page with the specified data
    index(req, res) {
        data = {
            siteTitle: vars.appName,
            pageTitle: '',
            description: 'NODE JS DESCRIPTION',
            urlCanonical: 'http://' + req.headers.host + req.originalUrl,
            user: req.user != undefined ? req.user : undefined
        }

        res.render('index', data);
    }

    // render terms and conditions page with the specified data
    termsAndConditions(req, res) {
        data = {
            siteTitle: vars.appName,
            pageTitle: ' - Términos y Condiciones',
            description: 'NODE JS TÉRMINOS Y CONDICIONES',
            urlCanonical: 'http://' + req.headers.host + req.originalUrl,
            user: req.user != undefined ? req.user : undefined
        }

        res.render('terms-&-conditions', data);
    }

    // render privacy policy page with the specified data
    privacyPolicy(req, res) {
        data = {
            siteTitle: vars.appName,
            pageTitle: ' - Política de Privacidad',
            description: 'NODE JS POLÍTICA DE PRIVACIDAD',
            urlCanonical: 'http://' + req.headers.host + req.originalUrl,
            user: req.user != undefined ? req.user : undefined
        }

        res.render('privacy-policy', data);
    }

    // render cookies policy page with the specified data
    cookiesPolicy(req, res) {
        data = {
            siteTitle: vars.appName,
            pageTitle: ' - Política de Cookies',
            description: 'NODE JS POLÍTICA DE COOKIES',
            urlCanonical: 'http://' + req.headers.host + req.originalUrl,
            user: req.user != undefined ? req.user : undefined
        }

        res.render('cookies-policy', data);
    }

    // send the text with the foo page visit counts
    foo(req, res) {
        res.send('you viewed this page ' + req.session.views['/foo'] + ' times');
    }

    // send the text with the bar page visit counts
    bar(req, res) {
        res.send('you viewed this page ' + req.session.views['/bar'] + ' times');
    }
}

module.exports = new HomeController();