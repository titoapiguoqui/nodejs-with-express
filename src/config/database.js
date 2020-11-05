// Load variables
const vars = require('./config');

// Database environments schemas
module.exports = {
    development: {
        dialect: vars.DBDialect,
        host: vars.DBHost,
        port: vars.DBPort,
        user: vars.DBUser,
        password: vars.DBPassword,
        database: vars.DBName,
        waitForConnection: vars.DBWaitForConnection,
        connectionLimit: vars.DBConnectionLimit
    },
    test: {
        dialect: vars.DBDialect,
        host: vars.DBHost,
        port: vars.DBPort,
        user: vars.DBUser,
        password: vars.DBPassword,
        database: vars.DBName,
        waitForConnection: vars.DBWaitForConnection,
        connectionLimit: vars.DBConnectionLimit
    },
    production: {
        dialect: vars.DBDialect,
        host: vars.DBHost,
        port: vars.DBPort,
        user: vars.DBUser,
        password: vars.DBPassword,
        database: vars.DBName,
        waitForConnection: vars.DBWaitForConnection,
        connectionLimit: vars.DBConnectionLimit,
    }
};