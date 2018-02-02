const db = require("../../config/base")
const knex = db.knex

exports.Model = db.Model.extend({
    tableName: 'user_actions',
    permittedAttributes: ['id', 'action', 'action_type', 'action_on', 'action_by'],

    initialize() {
      this.on('creating', this.creating, this);
    },

    creating() {
      this.set('action_on', moment.utc().format("YYYY-MM-DD HH:mm:ss"));
    },

  },{
    getAllActivites : ({to, from}) =>{
        return knex.select("action", "action_type")
          .from("user_actions")
          .whereBetween('created_on', [from, to])
    },
  getAllUserActivites : ({to, from}, userId) =>{
    return knex.select("action", "action_type")
      .from("user_actions")
      .where("action_by", userId)
      .whereBetween('action_on', [from, to])
  }

  }
);