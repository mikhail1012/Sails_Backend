/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 *
 * @param {number} req.query.page
 *
 */

module.exports = async function itemsbyuserid(req, res) {

    var result = {};

    try {

        var token = req.headers['token'];
        var auth = await sails.helpers.parsetoken(token);
        var user_id = auth.user_id;

        var page = req.query.page;

        if (Number(page) > 0) {

            var limit = 50;
            var start = (page - 1) * limit;

            var itemsResult = await Users.getDatastore().sendNativeQuery("CALL `get_user_ticed_items`($1,$2,$3);", [user_id, start, limit]);
            var items = itemsResult.rows[0];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                var item_id = item.item_id;
                
                var imagesResult = await Users.getDatastore().sendNativeQuery("CALL `item_image_by_item_id`($1);", [item_id]);
                var locationsResult = await Users.getDatastore().sendNativeQuery("CALL `item_locations_by_item_id`($1);", [item_id]);
                var tagsResult = await Users.getDatastore().sendNativeQuery("CALL `item_tags_by_item_id`($1);", [item_id]);
                var linksResult = await Users.getDatastore().sendNativeQuery("CALL `item_links_by_item_id`($1);", [item_id]);
      
                item.images = imagesResult.rows[0];
                item.locations = locationsResult.rows[0];
                item.tags = tagsResult.rows[0];
                item.links = linksResult.rows[0];
                
                var userTicResult = await Users.getDatastore().sendNativeQuery("CALL `get_user_item_tic`($1,$2);", [user_id, item_id]);
                item.user_item_tic = {};
                if(userTicResult.rows[0].length > 0){
                    item.user_item_tic = userTicResult.rows[0][0];
                }
            }
            
            result.data = items;
        } else {
            result.message = "Please provide valid page number";
        }
        return res.json(result)
    }
    catch (error) {
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
        console.log("error:", error);
        result.response = false;
        return res.json(result);
    }
};
