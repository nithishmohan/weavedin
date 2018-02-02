"use strict";
const items= require('../app/controllers/items')
const variants= require('../app/controllers/variants')


module.exports = function(app) {
  app.put('/items', items.create)
  app.post('/items/edit', items.update);
  app.put('/variants', variants.create)
  app.put('/variants/:itemId', variants.update);


}