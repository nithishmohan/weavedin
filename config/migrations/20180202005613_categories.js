"use strict";
exports.up = function(knex, Promise) {
  console.log("ctaggories")
  return knex.schema.createTableIfNotExists('categories', function(t) {
    t.varchar('name', '30').notNullable()
  })};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
