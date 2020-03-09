/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("password_key")
 *
 */

module.exports = async function forgotpasswordbykey (req, res) {

  var password_key = req.param("password_key", "");

  var result = {};

  try {

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `forgot_password_by_key`($1);", [password_key]);

    if (rawResult.rows[0].length > 0) {
      result.token_verify = rawResult.rows[0][0].token;

     return res.json(result);

    } else {

      result.message = "Wrong password_key!";
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

