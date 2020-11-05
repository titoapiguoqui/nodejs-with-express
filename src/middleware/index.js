module.exports = {
    /* Authentication: require('./authentication.middleware'), */
    isEmptyCredentials: require('./credentials.middleware'),
    isLoggedIn: require('./logging.middleware'),
    ViewsCount: require('./views-count.middleware'),
    Errors: require('./errors')
}