/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  //'*': true,
  '*': false,

  PassportController:{
    'facebookAuth': true,
    'facebookCallback': true
  },

  'users/register': true,                         //true
  'users/login': true,                            //true
  'users/logout': true,                           //true
  'users/isvalidemail': true,                     //true
  'users/verifyuser': true,                       //true
  'users/userinfo': 'sessionAuth',                //'sessionAuth'
  'users/userupdate': 'sessionAuth',              //'sessionAuth'
  'users/changepassword': 'sessionAuth',          //'sessionAuth'
  'users/forgotpassword': true,                   //true
  'users/forgotpasswordbykey': true,              //true
  'users/forgotpasswordchange': true,             //true
  'users/verifypassword': true,                   //true
  'users/userdelete': 'sessionAuth',              //'sessionAuth'

  'items/itemsgetcommon' : 'sessionAuth',
  'items/browsesearch': 'sessionAuth',            //'sessionAuth'

  'items/itemslistbylistid': 'sessionAuth',       //'sessionAuth'
  'items/itemsgetlist': true,            //'sessionAuth'
  'items/itemticadd': 'sessionAuth',              //'sessionAuth'
  'items/itemticupdate': 'sessionAuth',
  'items/itemslistbyuserid': 'sessionAuth',       //'sessionAuth'
  'items/tagsgetlist': 'sessionAuth',             //'sessionAuth'

  'lists/listsgetlist': true,            //'sessionAuth'
  'lists/listsgetbyuserid': 'sessionAuth',        //'sessionAuth'
  'lists/listsadd': 'sessionAuth',                //'sessionAuth'
  'lists/listsupdate': 'sessionAuth',             //'sessionAuth'
  'lists/listsdelete': 'sessionAuth',             //'sessionAuth'
  'lists/listsdeleteall': 'sessionAuth',          //'sessionAuth'
  'lists/listsgetcommon' : 'sessionAuth',

  // Tags Related Policies and actions.
  'tags/tagsgetlist': true,                 //'sessionAuth'
  'tags/tagsbyuserid': 'sessionAuth',

  // Locations related Policies.
  'locations/locationsgetlist': true,            //'sessionAuth'
  'locations/locationsbyuserid': 'sessionAuth',

  'items/itemscountbyuserid': 'sessionAuth',
  'items/itemsbyuserid': 'sessionAuth',

  'lists/listitemadd' : 'sessionAuth',
  'lists/listitemdelete' : 'sessionAuth',

  'images/imageadd' : 'sessionAuth'
};
