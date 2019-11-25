const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) require('dotenv').config({ path: 'server/env/variables.test.env' });
const User = require('../models/User');

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) return res.status(403).json({ error: 'Email is taken' });
      User.create(req.body)
        .then(user => {
          req.body.user = user;
          return next();
        })
        .catch(error => res.status(403).json(error));
    })
    .catch(error => res.status(403).json(error));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(401).json({ error: 'Authentication error' });

      // check password - model method
      if (!user.authenticate(req.body.password)) {
        return res.status(401).json({ error: 'Authentication error' });
      }

      req.body.user = user;
      next();
    })
    .catch(error => res.status(403).json(error));
};

exports.returnToken = (req, res) => {
  const { _id, name, email } = req.body.user;

  // create token
  const token = jwt.sign({ name, email, _id }, process.env.SECRET_OR_KEY);

  // attach cookie
  res.cookie('social-base', token, { expire: new Date() + 3600 });

  // return data
  return res.json({ token, user: { _id, name, email } });
};

exports.signout = (req, res) => {
  res.clearCookie('social-base');
  res.end();
};

exports.isAuth = expressJwt({
  secret: process.env.SECRET_OR_KEY,
  userProperty: 'auth'
});
