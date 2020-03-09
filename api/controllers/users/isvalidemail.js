/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("user_email")
 *
 */

module.exports = async function isvalidemail (req, res) {

  var result = {};

  try {
    var user_email = req.param("user_email", "");


    var sql = "CALL `user_isvalid_email`($1);";
    var valuesToEscape = [user_email];
    var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

    if (rawResult.rows[0].length > 0) {
      result.message = "This email already used";

      return res.json(result);

    } else {
      result.response = true;
      return res.json(result);
    }
  } catch (error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    return res.json(result);
  }
};
