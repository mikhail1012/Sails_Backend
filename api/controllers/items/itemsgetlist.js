/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.page
 *
 */

module.exports = async function itemsgetlist(req, res) {

  let result = {};
  try {

    var page = req.query.page;
    var limit = 50;

    if (Number(page) > 0) {

      var start = (page - 1) * limit;

      var rawResult = await Items.getDatastore().sendNativeQuery("CALL `items_get_by_tier`($1,$2);", [start, limit]);

      if (rawResult.rows[0].length > 0) {
        result.lists = rawResult.rows[0];

        return res.json(result);

      } else {

        result.message = "No Items Found!";
        return res.json(result);
      }
    } else {
      result.message = "No Items Found!";
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
