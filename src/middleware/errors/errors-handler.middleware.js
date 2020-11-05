// typical errors
const errors = {
    // errors 4XX
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUNT: 404,
    METHOD_NOT_ALLOWED: 405,

    // errors 5XX
    INTERNAL_SERVER_ERROR: 500
}

// default error details
const defaultDetails = {
    status: 500,
    message: 'Internal Server Error',
    logError: true
}

// defines how to handle individual errors (typically will be used for special cases)
function reducer(err) {
    // switch error with status and return error data
    switch (err.status) {
        case errors.BAD_REQUEST:
            return {
                status: errors.BAD_REQUEST,
                message: 'Bad Request Error',
                logError: false
            }
        case errors.UNAUTHORIZED:
            return {
                status: errors.UNAUTHORIZED,
                message: 'Unauthorized Error',
                logError: false
            }
        case errors.FORBIDDEN:
            return {
                status: errors.FORBIDDEN,
                message: 'Forbidden Error',
                logError: false
            }
        case errors.NOT_FOUNT:
            return {
                status: errors.NOT_FOUNT,
                message: 'Not Found Error',
                logError: false
            }
        case errors.METHOD_NOT_ALLOWED:
            return {
                status: errors.METHOD_NOT_ALLOWED,
                message: 'Method Not Allowed Error',
                logError: false
            }
        default:
            return defaultDetails
    }
}

// handler for errors
module.exports = (err, req, res, next) => {
    // getting the error response details relevant to this error
    let { status, message, logError } = reducer(err);

    // show error in console if variable logError is true
    if (logError) {
        console.log({
            message: err.message,
            stack: err.stack,
            method: req.method,
            path: req.path
        });
    }

    // set the specified data
    data = {
        siteTitle: '',
        pageTitle: status + ' Error',
        description: status + ' Error' + '. ' + err.message,
        urlCanonical: '',
        message: err.stack,
        user: req.user != undefined ? req.user : undefined
    }

    // render error response with the specified data
    res.status(status).render('error', data);
}