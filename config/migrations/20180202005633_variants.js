"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('variants', function(t) {
    t.increments('id').primary()
    t.increments('item_id').references('id').inTable('items')
    t.string('name', '30').notNullable()
    t.smallint('selling_price').notNullable()
    t.smallint('cost_price').notNullable()
    t.json('properties')
    t.smallint('quantity')
    t.integer('created_by',11).references('id').inTable('users')
    t.dateTime('created_on').notNullable()
    t.string("action_type", '8')
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('variants')
};
