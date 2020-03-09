/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.status
 *
 */

module.exports = async function itemsgetcommon(req, res) {

    var result = {};

    try {
        var token = req.headers['token'];
        var auth = await sails.helpers.parsetoken(token);

        var limit = 50;
        var start = 0;

        console.log(req.query);

        if (req.query.hasOwnProperty('page') && Number(req.query.page) > 0) {
            start = (req.query.page - 1) * limit;
        }

        var sql;
        var valuesToEscape;
        var user_id = auth.user_id;

        if (req.query.hasOwnProperty('admin') && req.query.admin == 'true') {
            sql = "CALL `get_items_all`($1,$2);";
            valuesToEscape = [start, limit];
        } else if (req.query.hasOwnProperty('tictic') && req.query.tictic == 'true') {
            sql = "CALL `get_items_tictic`($1,$2);";
            valuesToEscape = [start, limit];
        } else if (req.query.hasOwnProperty('list_id')) {
            var list_id = req.query.list_id;
            sql = "CALL `item_list_by_list_id`($1,$2,$3);";
            valuesToEscape = [list_id, start, limit];
        } else if (req.query.hasOwnProperty('search')) {
            var search = req.query.search;
            sql = "CALL `items_search_by_name`($1,$2,$3);";
            valuesToEscape = [search, start, limit];
        } else if (req.query.hasOwnProperty('user_id')) {
            user_id = req.query.user_id;
            sql = "CALL `get_user_ticed_items`($1,$2,$3);";
            valuesToEscape = [user_id, start, limit];
        } else {
            user_id = auth.user_id;
            sql = "CALL `get_user_ticed_items`($1,$2,$3);";
            valuesToEscape = [user_id, start, limit];
        }

        var itemsResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);
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
            console.log(userTicResult.rows[0].length);
            item.user_item_tic = {};
            if(userTicResult.rows[0].length > 0){
                item.user_item_tic = userTicResult.rows[0][0];
            }
        }
        
        result.data = items;
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
