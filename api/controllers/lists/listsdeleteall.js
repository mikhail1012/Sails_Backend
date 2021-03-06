/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 */

module.exports = async function listsdeleteall (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;
    var status_id = 3;

    var rawResult_list = await Users.getDatastore().sendNativeQuery("CALL `lists_get_by_user_id`($1,$2);", [user_id, status_id]);

    if (rawResult_list.rows[0].length > 0) {

      for (var i = 0; i < rawResult_list.rows[0].length; i++) {

        var list_id = rawResult_list.rows[0][i].list_id;

        var sql = "CALL `list_delete`($1,$2);";
        var valuesToEscape = [list_id, user_id];
        var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

      }

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

