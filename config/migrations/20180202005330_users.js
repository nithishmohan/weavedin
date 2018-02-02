"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(t) {
    t.increments('id').primary();
    t.string('first_name', 20);
    t.string('last_name', 20);
    t.dateTime('created_on').notNullable()
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
