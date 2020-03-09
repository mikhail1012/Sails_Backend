/**
 * PassportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var passport = require('passport');

module.exports = {
  facebookAuth: function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email']})(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    console.log("req", req);
    passport.authenticate('facebook', function(err, user) {

      console.log('facebook credentials');
      console.log(user);
      res.json(user);
    })(req, res, next);
  },

};
