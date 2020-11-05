// getting necessaries npm middleware packages
const bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    flash = require("connect-flash"),
    helmet = require("helmet"),
    express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session');

// initialize server express
const server = express();

// getting vars and routes
const { vars } = require('./src/config'),
    { AuthRoutes, HomeRoutes } = require('./src/routes');

// getting middleware
var { ViewsCount, Errors } = require('./src/middleware');

// configuring middleware needed
server.use(logger('dev'));  // middleware to view log in console
server.use(bodyParser.urlencoded({ extended: true }));  // middleware to accept query string in req.body
server.use(bodyParser.json());  // middleware to accept json bodies in req.body
server.use(cookieParser()); // middleware to parse cookie header and populate req.cookies with an object keyed by the cookie names
server.use(cors()); // middleware to enable cors with various options
server.use(helmet());   // middleware to secure app by setting various HTTP headers

// setting views in various routes
server.set('views', [
    path.join(__dirname, '/src/views'),
    path.join(__dirname, '/src/views/auth'),
    path.join(__dirname, '/src/views/policies')
]);
// view engine setup with ejs 
server.set("view engine", "ejs");

// serving static files
server.use(express.static(path.join(__dirname, '/src/public')));

// serving session
server.use(session({
    secret: 'ultra secret key',
    resave: false,
    saveUninitialized: false
}));

// setup passport and serving passport with flash data
require('./src/services/passport.service')(passport);
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

// serving another middleware
server.use(ViewsCount);

// serving routes
AuthRoutes(server, passport);   // routes to authenticate app
server.use("/", HomeRoutes);    // routes to render index views

// serving errors handler
server.use(Errors.NotFound);    // generate a 404 error to
server.use(Errors.ErrorsHandler);   // handle errors types

// listen server in specific port and show all activities
// on our terminal to let us know what is happening in our app
server.listen(vars.port, function (req, res) {
    console.log('==> 🌎 Listening on port %s. \nVisit %s:%s/ in your browser.',
        vars.port, vars.baseUrl, vars.port);
});