/**
 * ListsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @param {number} req.query.status
 *
 */

module.exports = async function listsgetcommon(req, res) {

    var result = {};

    try {
        var token = req.headers['token'];
        var auth = await sails.helpers.parsetoken(token);

        var limit = 50;
        var start = 0;

        if (req.query.hasOwnProperty('page') && Number(req.query.page) > 0) {
            start = (req.query.page - 1) * limit;
        }

        var sql;
        var valuesToEscape;

        if (req.query.hasOwnProperty('admin') && req.query.admin == 'true') {
            sql = "CALL `get_lists_all`($1,$2);";
            valuesToEscape = [start, limit];
        } else if (req.query.hasOwnProperty('tictic') && req.query.tictic == 'true') {
            sql = "CALL `get_lists_tictic`($1,$2);";
            valuesToEscape = [start, limit];
        } else if (req.query.hasOwnProperty('user_id')) {
            var user_id = req.query.user_id;
            sql = "CALL `get_lists_by_user_id`($1,$2,$3);";
            valuesToEscape = [user_id, start, limit];
        } else {
            var user_id = auth.user_id;
            sql = "CALL `get_lists_by_user_id`($1,$2,$3);";
            valuesToEscape = [user_id, start, limit];
        }

        var listsResult = await Users.getDatastore().sendNativeQuery(sql, valuesToEscape);
        var lists = listsResult.rows[0];
        if (lists.length > 0) {
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                var itemsCountResult = await Users.getDatastore().sendNativeQuery("CALL `item_count_by_list_id`($1);", [list.list_id]);
                list.items = itemsCountResult.rows[0][0].items_count;
            }
            result.lists = lists;
            return res.json(result);
        } else {
            result.message = "No Lists!";
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
