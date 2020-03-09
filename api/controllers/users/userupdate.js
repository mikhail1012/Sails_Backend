/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("full_name")
 * @param {string} req.param("photo")
 *
 */

module.exports = async function userupdate (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var full_name = req.param("full_name", "");
    var photo = req.param("photo", "");

    var sql = "CALL `user_update`($1,$2,$3);";
    var valuesToEscape = [user_id, full_name, photo];
    var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

    var rawResult_user = await Users.getDatastore().sendNativeQuery("CALL `user_info`($1);", [user_id]);

    delete rawResult_user.rows[0][0]["password"];
    result.data = rawResult_user.rows[0][0];
    return res.json(result);

  }
  catch (ex) {
    result.error = false;
    result.message = ex;
    req.session.authenticated = false;
    return res.json(result);
  }
};
