/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {string} req.param("list_id")
 * @param {number} req.param("status_id")
 * @param {string} req.param("title")
 * @param {string} req.param("description")
 * @param {string} req.param("slug")
 *
 */

module.exports = async function listsupdate (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var list_id = req.param("list_id", "");
    var status_id = req.param("status_id", "");
    var title = req.param("title", "");
    var description = req.param("description", "");
    var slug = req.param("slug", "");

    var rawResult_list = await Users.getDatastore().sendNativeQuery("CALL `list_by_list_id`($1);", [list_id]);

    if (rawResult_list.rows[0].length > 0) {

      var sql = "CALL `lists_update`($1,$2,$3,$4,$5,$6);";
      var valuesToEscape = [list_id, status_id, title, description, slug, user_id];
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

