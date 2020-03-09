/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {string} req.param("token_verify")
 *
 */

module.exports = async function verifypassword (req, res) {

  var result = {};
  try {
    var newToken = req.param("token_verify", "");
    var token = newToken.replace(/-/g, '/');

    var data = await sails.helpers.parsetoken(token);
    var rawResult = await Users.getDatastore().sendNativeQuery("CALL `verify_password_by_id`($1);", [data.verify_id]);

    if (rawResult.rows[0].length > 0) {
      var user_id = rawResult.rows[0][0].user_id;


      var rawResult2 = await Users.getDatastore().sendNativeQuery("CALL `user_info`($1);", [user_id]);

      if (rawResult2.rows[0].length > 0) {
        var first_name = rawResult2.rows[0][0].first_name;

        var user_isactive_pass = 0;
        await Users.getDatastore().sendNativeQuery("CALL `user_isactive_pass_update`($1,$2);", [user_id, user_isactive_pass]);

        req.session.destroy(function (err) {

        });

        await Users.getDatastore().sendNativeQuery("CALL `verify_password_delete`($1);", [data.verify_id]);

        result.message = first_name + " your Tictic account is now locked until you reset your password. Please click the link below to reset your password now.";

        res.send('<div style=" text-align:center">Your Tic-tic account is now locked until you reset your password. Please click the link below to reset your password now.</div>')
        //return res.json(result);

      } else {
        result.message = "No User!";

        res.send('<div style=" text-align:center">No User!</div>')
        //return res.json(result);
      }

    } else {
      result.message = "This link is invalid";

      res.send('<div style=" text-align:center">This link is invalid.</div>')
      //return res.json(result);
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
