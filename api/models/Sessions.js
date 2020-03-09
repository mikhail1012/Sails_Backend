/**
 * Sessions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  tableName: 'sessions',
  attributes: {
    updatedAt: false,
    createdAt: false,
    id: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'sessionid'
    },
    userid: {
      type: 'string',
      unique: false,
      required: true,
      columnName: 'userid'
    }
  }
};

