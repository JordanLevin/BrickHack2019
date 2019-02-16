const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mustacheExpress = require('mustache-express');

//================================== ROUTES =======================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var alexaRouter = require('./routes/alexa');

//================================== LOGINS AND SESSIONS =========================
var session = require('express-session');
var passport = require('passport');
app.use(session({secret: "secretstringthing"}));
app.use(passport.initialize());
app.use(passport.session());

var app = express();

// view engine setup
app.engine("mustache", mustacheExpress());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {});
});

module.exports = app;
