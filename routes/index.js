"use strict";
const items= require('../app/controllers/items')

module.exports = function(app) {
  console.log("coming")
  app.put('/items', items.create);
}