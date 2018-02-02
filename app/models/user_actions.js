const db = require("../../config/base")
const knex = db.knex

exports.Model = db.Model.extend({
    tableName: 'user_actions',
    permittedAttributes: ['id', 'action', 'action_type']
  }
);