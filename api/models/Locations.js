/**
 * Tags.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  tableName: 'locations',
  attributes: {
    updatedAt: false,
    createdAt: false,
    id: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'location_id'
    },
    name: {
      type: 'string',
    }
  }
};

