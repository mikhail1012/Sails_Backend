/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.page
 * @param {string} req.query.search
 *
 */

module.exports = async function browsesearch (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var page = req.query.page;
    var limit = 10;
    var searchterm = req.query.search;
    var list_id = req.param("list_id", "");

    if (searchterm && Number(page) > 0) {

      var start = (page - 1) * limit;

      var rawResult_lists = await Users.getDatastore().sendNativeQuery("CALL `lists_search_by_title`($1,$2,$3);", [searchterm, start, limit]);

      if (rawResult_lists.rows[0].length > 0) {

        result.lists = rawResult_lists.rows[0];

        for (let i = 0; i < rawResult_lists.rows[0].length; i++) {

          let list_id = rawResult_lists.rows[0][i].list_id;

          var rawResult_item = await Users.getDatastore().sendNativeQuery("CALL `item_count_by_list_id`($1);", [list_id]);

          result.lists[i].items = rawResult_item.rows[0][0].items_count;
        }

      } else {

        result.lists = rawResult_lists.rows[0]
      }


      var rawResult_items = await Users.getDatastore().sendNativeQuery("CALL `items_search_by_name`($1,$2,$3);", [searchterm, start, limit]);

      if (rawResult_items.rows[0].length > 0) {

        result.items = rawResult_items.rows[0];

        for (let i = 0; i < rawResult_items.rows[0].length; i++) {

          let item_id = rawResult_items.rows[0][i].item_id;

          let rawResult_user_item_tic = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_by_user_id`($1,$2,$3);", [user_id, item_id, list_id]);

          let rawResult_image = await Users.getDatastore().sendNativeQuery("CALL `item_image_by_item_id`($1);", [item_id]);


          result.items[i].user_item_tic = rawResult_user_item_tic.rows[0];
          result.items[i].images = rawResult_image.rows[0];
        }

      } else {

        result.items = rawResult_items.rows[0];
      }


      var rawResult_tags = await Users.getDatastore().sendNativeQuery("CALL `tags_search_by_name`($1,$2,$3);", [searchterm, start, limit]);

      if (rawResult_tags.rows[0].length > 0) {

        result.tags = rawResult_tags.rows[0];

      } else {

        result.tags = rawResult_tags.rows[0];
      }

      var rawResult_locations = await Users.getDatastore().sendNativeQuery("CALL `locations_search_by_name`($1,$2,$3);", [searchterm, start, limit]);

      if (rawResult_locations.rows[0].length > 0) {

        result.locations = rawResult_locations.rows[0];

      } else {

        result.locations = rawResult_locations.rows[0];
      }

      return res.json(result);

    } else {
      result.message = "No Results!";
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
