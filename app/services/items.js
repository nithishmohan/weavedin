'use strict'

const Items = require("../models/items").Model
const moment = require("moment")
exports.create = (input, userId) => {
   return Items.add({
     name: input.name,
     brand: input.brand,
     category: input.category,
     product_code: input.product_code,
     created_by: userId,
     created_on: moment.utc()
   })
     .then(c => console.log(c))
     .catch(err => console.log(err))
}



