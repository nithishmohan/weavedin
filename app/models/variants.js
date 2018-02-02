const db = require("../../config/base")
const knex = db.knex

exports.Model = db.Model.extend({
    tableName: 'variants',
    permittedAttributes: ['id', 'name', 'item_id', 'cost_price', 'selling_price', 'properties', 'created_by', 'created_on', 'is_active']
  }
);