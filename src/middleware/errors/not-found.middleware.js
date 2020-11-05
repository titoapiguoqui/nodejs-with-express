// getting necessary middleware npm middleware package
const createError = require('http-errors');

// create a 404 error
module.exports = (req, res, next) => {
    next(createError(404));
}