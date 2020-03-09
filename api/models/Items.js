/**
 * Items.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  tableName: 'items',
  attributes: {
    updatedAt: false,
    createdAt: false,
    id: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'item_id'
    },
    name: {
      type: 'string',
    },
    slug: {
      type: 'string',
    },
    description: {
      type: 'string',
    }
  }
};

