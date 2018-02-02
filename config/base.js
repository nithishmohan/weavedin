"use strict"

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'weavedin',
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
      this.set('created_on', moment.utc())
    }
  },

  saving: function () {
    // Remove any properties which don't belong on the model
    this.attributes = this.pick(this.permittedAttributes)
  }
}, {
  add: function (newObj, options) {
    console.log("herrr", newObj)
    console.log("options", options)
    options = options || {};
    return this.forge(newObj).save(null, options)
  }
})

module.exports = db

