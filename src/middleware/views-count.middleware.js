// getting necessary middleware npm middleware package
const parseUrl = require('parseurl');

// middleware to count views visited
module.exports = (req, res, next) => {
    // create a variable in sessions if not exists
    if (!req.session.views) {
        req.session.views = {};
    }

    // getting the url pathname
    let pathname = parseUrl(req).pathname;

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
}