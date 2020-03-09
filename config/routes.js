/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'GET /api/v1/auth/facebook': {controller: 'PassportController', action: 'facebookAuth'},
  'GET /api/v1/auth/facebook/callback': {controller: 'PassportController', action: 'facebookCallback'},

  'GET /api/v1/lists': 'ListsController.listsgetcommon',
  'GET /api/v1/items': 'ItemsController.itemsgetcommon',
  'GET /api/v1/items/counts': 'ItemsController.itemscountbyuserid',
  'GET /api/v1/me/tags': 'TagsController.tagsbyuserid',
  'GET /api/v1/me/locations': 'LocationsController.locationsbyuserid',
  'POST /api/v1/list-item': 'ListsController.listitemadd',
  'DELETE /api/v1/list-item': 'ListsController.listitemdelete',

  'POST /api/v1/images': 'ImagesController.imageadd',


  'get /verifypassword/:token_verify': 'UsersController.verifypassword',

  'post /users/register': 'UsersController.register',
  'post /users/login': 'UsersController.login',
  'post /users/logout': 'UsersController.logout',
  'post /users/isvalidemail': 'UsersController.isvalidemail',
  'post /users/userinfo': 'UsersController.userinfo',
  'patch /users/update': 'UsersController.userupdate',
  'patch /users/changepassword': 'UsersController.changepassword',
  'post /users/forgotpassword': 'UsersController.forgotpassword',
  'post /users/forgotpasswordbykey': 'UsersController.forgotpasswordbykey',
  'post /users/forgotpasswordchange': 'UsersController.forgotpasswordchange',
  'delete /users/userdelete': 'UsersController.userdelete',

  'get /browse': 'ItemsController.browsesearch',

  'get /items/:list_id': 'ItemsController.itemslistbylistid',
  'get /items/list': 'ItemsController.itemsgetlist',
  'post /items/itemticadd': 'ItemsController.itemticadd',
  'post /items/itemticupdate': 'ItemsController.itemticupdate',
  'get /profile/items': 'ItemsController.itemslistbyuserid',
  'get /tags-list': 'ItemsController.tagsgetlist',


  'get /lists-get-list': 'ListsController.listsgetlist',
  'get /lists-get-by-user-id': 'ListsController.listsgetbyuserid',
  'post /list-add': 'ListsController.listsadd',
  'patch /list-update/:list_id': 'ListsController.listsupdate',
  'delete /list-delete/:list_id': 'ListsController.listsdelete',
  'delete /list-delete-all': 'ListsController.listsdeleteall',


  // This list is developoed by asif.
  // Tags.
  'get /tags-get-list': 'TagsController.tagsgetlist',


  // This list is developoed by asif.
  // Tags.
  'get /locations-get-list': 'LocationsController.locationsgetlist',


  'GET /user/items': 'ItemsController.itemsbyuserid',




};
