"use strict";
const items= require('../app/controllers/items')

module.exports = function(app) {
  app.put('/items', items.create);
}