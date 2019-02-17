// set up ======================================================================
// get all the tools we need
let express  = require('express');
let app      = express();
let path = require('path');
let port     = process.env.PORT || 8080;
let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
let passport = require('passport');
let flash    = require('connect-flash');

let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');
let mustacheExpress = require('mustache-express');

let configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'mustache');

// required for passport
app.use(session({ secret: 'defokrgjntiujnhrvgbjvrgtbnym' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Listening on port ' + port);

