/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("token")
 *
 */

module.exports = async function logout (req, res) {

  var token = req.param("token", "");

  var result = {};

  try {
    var data = await sails.helpers.parsetoken(token);

    await Users.getDatastore().sendNativeQuery("CALL `user_logout`($1);", [data.sessionid]);

    result.response = true;
    req.session.authenticated = true;
    return res.json(result);
  } catch (error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    req.session.authenticated = false;
    return res.json(result);
  }
};
