/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("user_email")
 *
 */

const uuidv4 = require('uuid/v4');

module.exports = async function forgotpassword  (req, res) {

  var result = {};
  try {
    var user_email = req.param("user_email", "");

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_isvalid_email`($1);", [user_email]);

    if (rawResult.rows[0].length > 0) {

      let letters = '0123456789';
      let cod = '';
      for (let i = 0; i < 4; i++) {
        cod += letters[Math.floor(Math.random() * 10)];
      }
      let forgot_password_id = uuidv4();
      let user_id = rawResult.rows[0][0].user_id;
      let full_name = rawResult.rows[0][0].full_name;
      let password_key = cod;

      let token = {};
      token.id = forgot_password_id;
      token.password_key = password_key;
      token = await sails.helpers.gettoken(token);

      var st = Math.round((new Date()).getTime() / 1000);
      var et = Math.round((new Date()).getTime() / 1000) + 86400;

      await Users.getDatastore().sendNativeQuery("CALL `forgot_password_add`($1,$2,$3,$4,$5,$6);", [forgot_password_id, user_id, password_key, token, st, et]);

      var email = {};

      email.template_name = "Forgot Password";

      email.from_email = "clayelliot@tictic.co";
      email.from_name = "Tic-tic";
      email.email = user_email;
      email.name = full_name;
      email.password_key = password_key;

      await sails.helpers.sendmailer(email);

      result.response = true;
      return res.json(result);

    } else {

      result.message = "No user found with provided e-mail";
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
