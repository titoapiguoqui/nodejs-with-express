// getting necessary npm packages and and necessary configurations
const mysql = require('mysql'),
    util = require('util'),
    { vars, DBSchema } = require('../config');

// choose the schema according environment
let schema = {};

if (vars.environment === 'development') schema = DBSchema.development;
else if (vars.environment === 'test') schema = DBSchema.test;
else if (vars.environment === 'production') schema = DBSchema.production;
else schema = DBSchema.development;

// create a mysql pool with the choose schema
const pool = mysql.createPool(schema);

// create connection
pool.getConnection((err, connection) => {
    // check if the connection have some error
    if (err) {
        if (err.code === 'ER_NOT_SUPPORTED_AUTH_MODE') {
            console.error('Client does not support authentication ' +
            'protocol requested by server; consider upgrading MySQL client');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was rejected');
        }
    }

    // release connection
    if (connection) connection.release();

    return;
});

// promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = { pool, schema };