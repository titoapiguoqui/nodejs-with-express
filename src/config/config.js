// Instance development and test environment variables
if (process.env.ENVIRONMENT !== 'production') {
    require('dotenv').config();
};

// Make this global to use all over the application
let VARS = {}

// App variables
VARS.environment = process.env.ENVIRONMENT || 'production';
VARS.appName = process.env.APP_NAME || 'Platform NODE JS';
VARS.baseUrl = process.env.BASE_URL || 'http://localhost';
VARS.port = process.env.PORT || 8000;

// Database variables
VARS.DBDialect = process.env.DB_DIALECT || 'mysql';
VARS.DBHost = process.env.DB_HOST || '127.0.0.1';
VARS.DBPort = process.env.DB_PORT || 3306;
VARS.DBUser = process.env.DB_USER || '';
VARS.DBPassword = process.env.DB_PASSWORD || '';
VARS.DBName = process.env.DB_NAME || '';
VARS.DBWaitForConnection = process.env.DB_WFC || true;
VARS.DBConnectionLimit = process.env.DB_CL || 70;

module.exports = VARS;