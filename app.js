const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const mustacheExpress = require('mustache-express');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb+srv://admin:wegmansApp@wegmansapp-uin85.mongodb.net/users', { useNewUrlParser: true });
mongoose.set('debug', true);

//Models and routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

// view engine setup
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'mustache');


//Error handlers & middlewares
//if(!isProduction) {
  //app.use((err, req, res) => {
    //res.status(err.status || 500);

    //res.json({
      //errors: {
        //message: err.message,
        //error: err,
      //},
    //});
  //});
//}

//app.use((err, req, res) => {
  //res.status(err.status || 500);

  //res.json({
    //errors: {
      //message: err.message,
      //error: {},
    //},
  //});
//});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

