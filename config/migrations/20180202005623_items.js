"use strict";
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('items', function(t) {
    t.increments('id').primary()
    t.string('name', '30').notNullable()
    t.string('brand', '20').notNullable()
    t.varchar('category', 30).references('name').inTable('categories').notNullable();
    t.string('product_code', '50').notNullable()
    t.integer("created_by").references('id').inTable('users')
    t.dateTime('created_on').notNullable()
    t.text("action_type")
    t.boolean("is_active").defaultTo(true)
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('items')
};
