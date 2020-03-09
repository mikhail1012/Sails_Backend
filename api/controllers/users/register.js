/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("user_id")
 * @param {string} req.param("full_name")
 * @param {string} req.param("user_email")
 * @param {string} req.param("password")
 *
 */
const uuidv4 = require('uuid/v4');

module.exports = async function register(req, res) {

  var result = {};

  try {

    var user_id = req.param("user_id",""); //uuidv4();
    var full_name = req.param("full_name", "");
    var user_email = req.param("user_email", "");
    var password = await sails.helpers.encrypt(req.param("password", ""));

      var sql = "CALL `user_register`($1,$2,$3,$4);";
      var valuesToEscape = [user_id, full_name, user_email, password];
      var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

    var guid = uuidv4();
    var st = Math.round((new Date()).getTime() / 1000);
    var et = Math.round((new Date()).getTime() / 1000) + 86400;
    var rawResult2 = await Sessions.getDatastore().sendNativeQuery("CALL `sessions_addbyuserid`($1,$2,$3,$4);", [guid, st, et, user_id]);
    var token = {};

    token.sessionid = guid;
    token.user_id = user_id;
    result.token = await sails.helpers.gettoken(token);
    req.session.token = result.token;
    req.session.authenticated = true;

    return res.json(result);

      // var st = Math.round((new Date()).getTime() / 1000);
      // var et = Math.round((new Date()).getTime() / 1000) + 86400;
      //
      // var verify_id = uuidv4();
      // var account_type_verify = 0;
      // var token = {};
      //
      // token.verify_id = verify_id;
      // token.user_id = user_id;
      // token = await sails.helpers.gettoken(token);
      //
      // var newToken_v = token.replace(/\//g, '-');
      //
      // var sql_v = "CALL `verify_users_add`($1,$2,$3,$4,$5,$6,$7,$8);";
      // var valuesToEscape_v = [verify_id, user_id, full_name, user_email, token, account_type_verify, st, et];
      // var rawResult_v = await Users.getDatastore().sendNativeQuery(sql_v, valuesToEscape_v);
      //
      // var verification_link_p = "http://167.99.50.150/verify/" + newToken_v;
      // //var verification_link_p = "http://localhost:1337/verify/" + newToken_v;
      //
      // var email = {};
      // email.template_name = "Registration Confirmation";
      // email.from_email = "clayelliot@tictic.com";
      // email.from_name = "Tic-tic";
      // email.name = full_name;
      // email.verification_link = verification_link_p;
      // email.email = user_email;
      // await sails.helpers.sendmailer(email);
      //
      // result.response = true;
      // return res.json(result);

      // var guid = uuidv4();
      // var st = Math.round((new Date()).getTime() / 1000);
      // var et = Math.round((new Date()).getTime() / 1000) + 86400;
      // var rawResult2 = await Sessions.getDatastore().sendNativeQuery("CALL `sessions_addbyuserid`($1,$2,$3,$4);", [guid, st, et, user_id]);
      // var token = {};
      // token.sessionid = guid;
      // token.user_id = user_id;
      // result.token = await sails.helpers.gettoken(token);
      //
      // req.session.token = result.token;
      // req.session.authenticated = true;
      // console.log(req.session);
      // return res.json(result);
  }
  catch (ex) {
    result.error = false;
    result.message = ex;
    req.session.authenticated = false;
    return res.json(result);
  }
};
