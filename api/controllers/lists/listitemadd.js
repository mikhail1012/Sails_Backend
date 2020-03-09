/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {string} req.param("list_id")
 * @param {string} req.param("item_id")
 *
 */

module.exports = async function listitemadd (req, res) {

    var result = {};
  
    try {
  
      var token = req.headers['token'];
      var data = await sails.helpers.parsetoken(token);
      var user_id = data.user_id;
  
      var list_id = req.param("list_id", "");
      var item_id = req.param("item_id", "");
      
      var sql = "CALL `post_list_item`($1,$2);";
      var valuesToEscape = [list_id, item_id];
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
  
  