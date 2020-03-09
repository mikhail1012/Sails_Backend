/**
 * Tags.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  tableName: 'tags',
  attributes: {
    updatedAt: false,
    createdAt: false,
    id: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'tag_id'
    },
    tag_name: {
      type: 'string',
    },
    tag_description: {
      type: 'string',
    },
    group_id: {
      type: 'string',
    },
    tag_display_order: {
      type: 'string',
    },
    status_id: {
      type: 'string',
    }
  }
};

