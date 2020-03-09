/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {string} req.param("user_item_tic_id")
 * @param {string} req.param("item_id")
 * @param {string} req.param("list_id")
 * @param {number} req.param("action_status_id")
 *
 */

module.exports = async function itemticadd (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;
    var user_item_tic_id = req.param("user_item_tic_id", "");
    var item_id = req.param("item_id", "");
    var list_id = req.param("list_id", "");
    var action_status_id = req.param("action_status_id", "");

    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_add`($1,$2,$3,$4,$5);", [user_item_tic_id, user_id, item_id, list_id, action_status_id]);

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
