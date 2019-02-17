const express = require('express');
const router = express.Router();
const auth = require('./auth');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

router.use('/api', require('./api'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/home', auth.required , function(req, res, next) {
    Users.findById(req.payload.id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      //console.log(user);
      res.render('home', { title: 'List' , user: user});
    });
});

module.exports = router;
