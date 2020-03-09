/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 */

module.exports = async function tagsgetlist (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `tags_get_list`();", []);

    if (rawResult.rows[0].length > 0) {

      result.items = rawResult.rows[0];
      return res.json(result);

    } else {

      result.message = "No Tags!";
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
