/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {number} req.query.page
 * @param {string} req.query.status
 *
 */

module.exports = async function itemslistbyuserid (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var page = req.query.page;
    var status = req.query.status;

    if (Number(page) > 0 && status) {

    var limit = 50;
    var start = (page - 1) * limit;

      var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_group_by_status`($1);", [user_id]);

      if (rawResult.rows[0].length > 0) {

        result.items_action = rawResult.rows[0];

    var status_array = [];
    var action_status = 0;
    for (var i = 0; i < status.length; i++) {
      action_status += 1;
      result.items = [];
      if (status[i] === '1') {
        var action_data = {
          action_status: action_status - 1,
          status: status[i]
        };
        status_array.push(action_data);
      }
    }

    for (var j = status_array.length - 1; j >= 0; j--) {

      var status_action_id = status_array[j].action_status;

      var rawResult_items = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_list_by_user_id`($1,$2,$3,$4);", [user_id, start, limit, status_action_id]);

      if (rawResult_items.rows[0].length > 0) {

        result.items = result.items.concat(rawResult_items.rows[0]);

      }
    }

    } else {

      result.message = "No Items!";
      return res.json(result);
    }

  } else {
    result.message = "No Items!";
    return res.json(result);
  }


        //
    // var rawResult_items = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_list_by_user_id`($1,$2,$3);", [user_id, start, limit]);
    //
    // result.items = rawResult_items.rows[0];
    //
    // return res.json(result);




    return res.json(result)
  }
  catch (error) {
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
    console.log("error:", error);
    result.response = false;
    return res.json(result);
  }
};
