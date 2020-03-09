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
 * @param {string} req.param("image_id")
 * @param {number} req.param("location_id")
 * @param {Date} req.param("modified_date")
 *
 */

module.exports = async function listsadd (req, res) {

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
    var image_id = req.param("image_id", null);
    var location_id = req.param("location_id", 0);
    var modified_date = req.param("modified_date", null);

    var sql = "CALL `lists_add`($1,$2,$3,$4,$5,$6,$7,$8,$9);";
    var valuesToEscape = [list_id, status_id, title, description, slug, image_id, location_id, user_id, modified_date];
    var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

    result.response = true;
    return res.json(result);

  }
  catch (error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    return res.json(result);
  }
};

