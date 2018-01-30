const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'weavdin',
    database: 'weavdin',
  },
  pool: {
    min: 2,
    max: 50,
    idleTimeout: 60 * 1000,
    acquireConnectionTimeout: 5 * 60 * 1000
  }
});

const db = require('bookshelf')(knex);

db.client = 'pg';

module.exports = db;

