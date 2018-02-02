"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('user_actions', function(t) {
    t.increments('id').primary()
    t.json('action').notNullable()
    t.string("action_type", '8').notNullable(),
    t.datetime("action_on").notNullable()
    t.integer('action_by').references('id').inTable('users')
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('variants')
};
