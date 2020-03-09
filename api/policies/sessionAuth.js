/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

 // policies/sessionAuth.js
module.exports = async function (req, res, proceed) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  var etoken = "";

  if (req.param("token","") != ""){
    etoken = req.param("token","");
  }else{
    etoken = req.headers['token'];
  }

  var result = {};

  if(typeof etoken == 'undefined'){
    console.log("forbidden:", etoken);
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden();
  }else{
    try {
      var data = await sails.helpers.parsetoken(etoken);
      var now = Math.round((new Date()).getTime() / 1000);

      var rawResult = await Sessions.getDatastore().sendNativeQuery("CALL `sessions_getbysession`($1,$2,$3);",[data.sessionid,data.user_id,now]);
      if (rawResult.rows[0].length > 0){
        return proceed();
      }else{
        return res.forbidden();
      }

    }  catch(error) {
      console.log("forbidden:", error);
      //--•
      // Otherwise, this request did not come from a logged-in user.
      return res.forbidden();
    }
  }

};
