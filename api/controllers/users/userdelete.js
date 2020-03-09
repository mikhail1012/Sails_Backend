/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 */

module.exports = async function userdelete (req, res) {

  var result = {};

  try {

    var token = req.headers['token'];
    var data = await sails.helpers.parsetoken(token);
    var user_id = data.user_id;

    var sql = "CALL `user_delete`($1);";
    var valuesToEscape = [user_id];
    var rawResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);

    await Users.getDatastore().sendNativeQuery("CALL `user_logout`($1);", [data.sessionid]);

    req.session.authenticated = true;
    result.response = true;
    return res.json(result);

  }
  catch (ex) {
    result.error = false;
    result.message = ex;
    req.session.authenticated = false;
    return res.json(result);
  }
};
