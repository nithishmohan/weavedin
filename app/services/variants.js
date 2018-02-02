'use strict'

const Variants= require("../models/variants").Model
const UserActions= require("../models/user_actions").Model
const Base = require('../../config/base')


exports.create = (input, userId) => {
  return Base.transaction(transaction => {
    return Variants.add({
      name: input.name,
      selling_price: input.sellingPrice,
      cost_price: input.costPrice,
      product_code: input.productCode,
      created_by: userId,
      item_id: input.itemId
    },{ transacting: transaction })
      .then(variant => variant.toJSON())
      .then(({id}) => {
        return UserActions.add({
          action : JSON.stringify({
            items : [{
              id : input.itemId,
              itemProperties : [],
              variants : [{
                id : id
              }]
            }]
          }),
          action_type: "add",
          action_by: userId
        }, {transacting: transaction})
      })
  })
}



