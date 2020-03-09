/**
 * TagsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.status
 *
 */

module.exports = async function tagsgetlist(req, res) {

  let result = {};
  try {

    var status = req.query.status;

    if (Number(status) >= 0) {

      var rawResult = await Tags.getDatastore().sendNativeQuery("CALL `tags_get_list`($1);", [status]);

      if (rawResult.rows[0].length > 0) {
        result.lists = rawResult.rows[0];

        return res.json(result);

      } else {

        result.message = "No Tags!";
        return res.json(result);
      }
    } else {
      result.message = "No Tags!";
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
