/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("password_old")
 * @param {string} req.param("password_new")
 * @param {string} req.param("password_confirm")
 *
 */

const uuidv4 = require('uuid/v4');

module.exports = async function changepassword(req, res) {

  var result = {};
  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var password_old = await sails.helpers.encrypt(req.param("password_old", ""));
    var password_new = await sails.helpers.encrypt(req.param("password_new", ""));
    var password_confirm = await sails.helpers.encrypt(req.param("password_confirm", ""));

    if (password_new === password_confirm) {

      var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_info`($1);", [user_id]);

      if (rawResult.rows[0].length > 0) {

        var user_email = rawResult.rows[0][0].user_email;
        var full_name = rawResult.rows[0][0].full_name;
        var user_password = rawResult.rows[0][0].password;

        if (user_password === password_old) {

            await Users.getDatastore().sendNativeQuery("CALL `user_password_update`($1,$2);", [user_id, password_new]);

            var verify_id = uuidv4();
            var st = Math.round((new Date()).getTime() / 1000);
            var et = Math.round((new Date()).getTime() / 1000) + 86400;

            var token_v = {};
            token_v.verify_id = verify_id;
            token_v.user_id = user_id;
            token_v = await sails.helpers.gettoken(token_v);
            var newToken_v = token_v.replace(/\//g, '-');

            var sql_v = "CALL `verify_password_add`($1,$2,$3,$4,$5);";
            var valuesToEscape_v = [verify_id, user_id, newToken_v, st, et];
            var rawResult2 = await Users.getDatastore().sendNativeQuery(sql_v, valuesToEscape_v);

            //var verification_link = "http://localhost:1337/verifypassword/" + newToken_v;
            var verification_link = "http://167.99.50.150/verifypassword/" + newToken_v;

            var email = {};
            email.template_name = "Password Change Confirmation";
            email.from_email = "clayelliot@tictic.co";
            email.from_name = "Tic-tic";
            email.name = full_name;
            email.verification_link = verification_link;
            email.email = user_email;

            await sails.helpers.sendmailer(email);

            result.response = true;
            return res.json(result);


        } else {
          result.message = "Your old Password is incorrect";
          return res.json(result);
        }
      } else {
        result.response = false;
        return res.json(result);
      }
    } else {

      result.message = 'Passwords are not same.';
      return res.json(result);
    }
  }
  catch (error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    return res.json(result);
  }
};
