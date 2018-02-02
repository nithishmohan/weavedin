const db = require("../../config/base")
const knex = db.knex
const moment = require("moment")

exports.Model = db.Model.extend({
  tableName: 'items',
  permittedAttributes: ['id', 'brand', 'category', 'product_code', 'creatd_by', 'created_on']
  }
);