/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("token_verify")
 * @param {string} req.param("password")
 * @param {string} req.param("password_confirm")
 *
 */

const uuidv4 = require('uuid/v4');

module.exports = async function forgotpasswordchange(req, res) {

  var result = {};
  try {

    var token = req.param("token_verify", "");
    var password = req.param("password", "");
    var password_confirm = req.param("password_confirm", "");

    if (password === password_confirm) {

      var data = await sails.helpers.parsetoken(token);

      var rawResult = await Users.getDatastore().sendNativeQuery("CALL `forgot_password_by_id`($1);", [data.id]);

      if (rawResult.rows[0].length > 0) {
        var user_id = rawResult.rows[0][0].user_id;

        var rawResult3 = await Users.getDatastore().sendNativeQuery("CALL `user_info`($1);", [user_id]);

        if (rawResult3.rows[0].length > 0) {

          var user_email = rawResult3.rows[0][0].user_email;
          var full_name = rawResult3.rows[0][0].full_name;

          var new_password = await sails.helpers.encrypt(password);

          await Users.getDatastore().sendNativeQuery("CALL `user_password_update`($1,$2);", [user_id, new_password]);

          var user_isactive_pass = 1;
          await Users.getDatastore().sendNativeQuery("CALL `user_isactive_pass_update`($1,$2);", [user_id, user_isactive_pass]);

          await Users.getDatastore().sendNativeQuery("CALL `forgot_password_delete`($1);", [data.id]);


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


          result.message = true;
          return res.json(result);

        } else {
          result.response = false;
          return res.json(result);
        }
      } else {
        result.response = false;
        return res.json(result);
      }
    } else {

      result.response = 'Passwords are not same.';
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
