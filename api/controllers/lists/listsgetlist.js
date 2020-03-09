/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.page
 *
 */

module.exports = async function listsgetlist(req, res) {

  var result = {};

  try {

    var page = req.query.page;
    var limit = 50;

    if (Number(page) > 0) {

      var start = (page - 1) * limit;

      var rawResult = await Users.getDatastore().sendNativeQuery("CALL `lists_get_list`($1,$2);", [start, limit]);

      if (rawResult.rows[0].length > 0) {
        result.lists = rawResult.rows[0];

        for (var i = 0; i < rawResult.rows[0].length; i++) {

          var list_id = rawResult.rows[0][i].list_id;

          var rawResult_item = await Users.getDatastore().sendNativeQuery("CALL `item_count_by_list_id`($1);", [list_id]);

          result.lists[i].items = rawResult_item.rows[0][0].items_count;
        }


        return res.json(result);

      } else {

        result.message = "No Lists!";
        return res.json(result);
      }
    } else {
      result.message = "No Lists!";
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
