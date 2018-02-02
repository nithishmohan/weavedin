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
          action_type: "add"
        }, {transacting: transaction})
      })
  })
}

exports.update = (input, itemId, variantId, userId) =>{

  const updateVale = {}
  input.name ? Object.assign(updateVale, {name: input.name}) : null
  input.sellingPrice ? Object.assign(updateVale, {selling_price: input.selling_price}) : null
  input.category ? Object.assign(updateVale, {category: input.category}) : null
  input.product_code ? Object.assign(updateVale, {product_code: productCode}) : null
  return Base.transaction(transaction => {
    return Items.edit({
      name: input.name,
      brand: input.brand,
      category: input.category,
      product_code: input.product_code,
      created_by: userId,
    },{ transacting: transaction })
      .then(item => item.toJSON())
      .then(({id}) => {
        return UserActions.edit({
          action : JSON.stringify({
            items : [{
              id : id,
              itemProperties: updateVale,
              variants: []
            }]
          }),
          action_type: "edit"
        }, {transacting: transaction})
      })
  })
}




