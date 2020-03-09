/**
 * LocationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 */

module.exports = async function locationsbyuserid(req, res){
    var result = {};
    try{
        var token = req.headers['token'];
        var user_id = (await sails.helpers.parsetoken(token)).user_id;

        var rawResult = await Users.getDatastore().sendNativeQuery("CALL `get_user_locations`($1);", [user_id]);
        result.data = rawResult.rows[0];
        res.json(result)
    }catch(error){
        result.response = false;
        result.message = "Failed to get users locations";
        res.json(result);
    }
}