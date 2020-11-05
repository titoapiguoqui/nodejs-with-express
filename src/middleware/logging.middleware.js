// handle the authentication logic in pages
module.exports = (req, res, next) => {
    // check if request haven't an user to redirect login
    if (!req.user) res.redirect('/login');

    // check if user has been authenticated
    if (req.isAuthenticated()) {
        // getting the path prohibited to user role
        prohibitedPaths = {
            "user": [
                "/foo",
                "/bar"
            ]
        };

        // getting role and path from request
        role = req.user.role;
        path = req.path;

        // check if role isn`t in prohibited paths and if role is in prohibited
        // paths but the path in request isn't in prohibited paths to continue
        if ((!prohibitedPaths[role] || !prohibitedPaths[role].includes(path)))
            return next();
    }

    // if user isn't authenticated redirect to login page
    res.redirect('/login');
};