/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("token")
 *
 */

module.exports = async function userinfo (req, res) {

  var token = req.param("token","");

  var result = {};

  try {
    var data = await sails.helpers.parsetoken(token);

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_info`($1);", [data.user_id]);

    if (rawResult.rows[0].length > 0){
      delete rawResult.rows[0][0]["password"];
      result.data = rawResult.rows[0][0];
      return res.json(result);
    }else{
      result.error = false;
      return res.json(result);
    }
  }
  catch(error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    return res.json(result);
  }
};
