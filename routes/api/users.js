const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const axios = require('axios');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  let user = {email: req.body.email, password: req.body.pass}

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  finalUser.save()
        .then(() => {
            passport.authenticate('local', {
                successRedirect: '/home',
                failureRedirect: '/signup',
            });
            //console.log(finalUser.toAuthJSON().token);
            //res.redirect('/home?' + 'Token=' + finalUser.toAuthJSON().token);
        });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    //console.log(req);
  const user = {email: req.body.email, password: req.body.pass};

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      console.log(passportUser);
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    //console.log(req.payload);
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
