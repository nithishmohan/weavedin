'use strict'

const Items= require("../models/items").Model
const UserActions= require("../models/user_actions").Model
const moment = require("moment")
const Base = require('../../config/base')


exports.create = (input, userId) => {
  return Base.transaction(transaction => {
    return Items.add({
      name: input.name,
      brand: input.brand,
      category: input.category,
      product_code: input.product_code,
      created_by: userId,
    },{ transacting: transaction })
      .then(item => item.toJSON())
      .then(({id}) => {
          return UserActions.add({
            action : JSON.stringify({
              items : [{
                id : id,
                itemProperties: [],
                variants: []
              }]
            }),
            action_type: "add"
          }, {transacting: transaction})
      })
  })
}



