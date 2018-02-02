"use strict"
const moment = require("moment")
const _ = require("lodash")
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB,
  },
  pool: {
    min: 2,
    max: 50,
    idleTimeout: 60 * 1000,
    acquireConnectionTimeout: 5 * 60 * 1000
  },
  migrations: {
    tableName: 'migrations'
  }

});

const db = require('bookshelf')(knex)

db.Model = db.Model.extend({
  initialize: function () {
    this.on('creating', this.creating, this)
    this.on('saving', this.saving, this)
  },

  creating: function () {
    if (!this.get('created_on')) {
      this.set('created_on', moment.utc().format("YYYY-MM-DD HH:mm:ss"))
    }
  },

  saving: function () {
    // Remove any properties which don't belong on the model
    this.attributes = this.pick(this.permittedAttributes)
  },
  toJSON: function (options) {
    const attrs = _.cloneDeep(this.attributes);

    const relations = this.relations;

    if (this.pivot) {
      attrs.pivot = this.pivot.attributes;
    }

    if (options && options.shallow) {
      return attrs;
    }

    _.each(relations, function (relation, key) {
      if (key.substring(0, 7) !== '_pivot_') {
        attrs[key] = relation.toJSON ? relation.toJSON() : relation;
      }
    });

    return attrs;
  },
}, {
  add: function (newObj, options) {
    options = options || {};
    return this.forge(newObj).save(null, options)
  },
  edit: function (editedObj, options) {
    options = options || {};
    return this.forge({id: editedObj.id}).fetch(options).then(function (foundObj) {
      return foundObj.save(editedObj, options);
    });
  },
  delete: function (id, options) {
    options = options || {};
    return this.forge({id: id}).destroy(options);  }
})

module.exports = db

