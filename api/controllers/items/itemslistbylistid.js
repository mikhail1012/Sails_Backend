/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {number} req.query.page
 * @param {string} req.param("list_id")
 *
 */

module.exports = async function itemslistbylistid (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];

    var page = req.query.page;
    var limit = 50;
    var list_id = req.param("list_id", "");

    if (Number(page) > 0) {

      var start = (page - 1) * limit;

      var rawResult = await Users.getDatastore().sendNativeQuery("CALL `item_list_by_list_id`($1,$2,$3);", [list_id, start, limit]);

      if (rawResult.rows[0].length > 0) {
        var data = await sails.helpers.parsetoken(token);

        result.items = rawResult.rows[0];

        for (var i = 0; i < rawResult.rows[0].length; i++) {

          var item_id = rawResult.rows[0][i].item_id;

          var rawResult_user_item_tic = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_by_user_id`($1,$2,$3);", [data.user_id, item_id, list_id]);

          var rawResult_image = await Users.getDatastore().sendNativeQuery("CALL `item_image_by_item_id`($1);", [item_id]);


          result.items[i].user_item_tic = rawResult_user_item_tic.rows[0];
          result.items[i].images = rawResult_image.rows[0];
        }

        return res.json(result);

      } else {

        result.message = "No Items!";
        return res.json(result);
      }
    } else {
      result.message = "No Items!";
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
