/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 *
 */

module.exports = async function itemscountbyuserid(req, res){
    var result = {};
    try{
        var token = req.headers['token'];
        var user_id = (await sails.helpers.parsetoken(token)).user_id;

        var rawResult = await Users.getDatastore().sendNativeQuery("CALL `user_item_tic_group_by_status`($1);", [user_id]);
        result.data = rawResult.rows[0];
        res.json(result)
    }catch(error){
        result.response = false;
        result.message = "Failed to get users tic'ed items counts";
        res.json(result);
    }

}