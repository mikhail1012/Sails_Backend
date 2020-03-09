/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {string} req.param("user_email")
 * @param {string} req.param("password")
 *
 */
const uuidv4 = require('uuid/v4');

module.exports = async function login(req, res) {

  var user_email = req.param("user_email", "");
  var password = await sails.helpers.encrypt(req.param("password", ""));


  var result = {};

  if (typeof user_email !== "undefined" && typeof password !== "undefined") {

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_login`($1,$2);", [user_email, password]);

    if (rawResult.rows[0].length > 0) {
        var user_isactive_pass = rawResult.rows[0][0].user_isactive_pass;

      if (user_isactive_pass === 1) {


        var guid = uuidv4();
        var st = Math.round((new Date()).getTime() / 1000);
        var et = Math.round((new Date()).getTime() / 1000) + 86400;
        var rawResult2 = await Sessions.getDatastore().sendNativeQuery("CALL `sessions_addbyuserid`($1,$2,$3,$4);", [guid, st, et, rawResult.rows[0][0].user_id]);
        var token = {};

        token.sessionid = guid;
        token.user_id = rawResult.rows[0][0].user_id;
        result.token = await sails.helpers.gettoken(token);
        req.session.token = result.token;
        req.session.authenticated = true;

        return res.json(result);

      } else {
        req.session.authenticated = false;
        result.message = "Your account is blocked";
        return res.json(result);
      }
    } else {

      req.session.authenticated = false;
      result.message = "Incorrect email or password";
      return res.json(result);
    }
  } else {

    result.error = false;
    req.session.authenticated = false;
    return res.json(result);
  }

};
