"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('user_actions', function(t) {
    t.increments('id').primary()
    t.json('action').notNullable()
    t.string("action_type", '8')
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('variants')
};
