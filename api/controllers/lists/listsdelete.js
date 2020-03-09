/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {string} req.param("list_id")
 *
 */

module.exports = async function listsdelete(req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var list_id = req.param("list_id", "");

    var rawResult_list = await Users.getDatastore().sendNativeQuery("CALL `list_by_list_id`($1);", [list_id]);

    if (rawResult_list.rows[0].length > 0) {

      var sql = "CALL `list_delete`($1,$2);";
      var valuesToEscape = [list_id, user_id];
      var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

      result.response = true;
      return res.json(result);

    } else {

      result.response = false;
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

