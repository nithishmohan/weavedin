'use strict'

const Items= require("../models/items").Model
const UserActions= require("../models/user_actions").Model
const Base = require('../../config/base')
const _ = require("lodash")


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
                itemProperties: null,
                variants: []
              }]
            }),
            action_type: "add"
          }, {transacting: transaction})
      })
  })
}

exports.update = (input, itemId, userId) =>{

  function updateItems(item) {
    const updateItem = { last_edited_by : userId, id: item.id}
    if(_.isEmpty(item))
      return Promise.resolve()

    item.name ? Object.assign(updateItem, {name: input.name}) : null
    input.brand ? Object.assign(updateItem, {brand: input.brand}) : null
    input.category ? Object.assign(updateItem, {category: input.category}) : null
    input.product_code ? Object.assign(updateItem, {product_code: productCode}) : null
    return Items.edit(updateItem,{ transacting: transaction })
  }

  function updateVariants(variants) {
    if(_.isEmpty(variants))
      return Promise.resolve()
    return when.map(variants, variant => {
      const updateVale = {last_edited_by : userId, id: variant.id}
      input.name ? Object.assign(updateVale, {name: variant.name}) : null
      input.sellingPrice ? Object.assign(updateVale, {selling_price: variant.selling_price}) : null
      input.category ? Object.assign(updateVale, {category: variant.category}) : null
      input.product_code ? Object.assign(updateVale, {product_code: variant.productCode}) : null
      return Variants.edit(updateVale,{ transacting: transaction })
    })
  }

  function addUserAction(action, transaction) {
    return UserActions.add({
      action : JSON.stringify(action.map(item => {
        return {
          id: item.id,
          itemProperties: _.pick(Object.keys(item), ['name', 'brand', 'category', 'productCode']),
          variants: item.variants.map(variant => {
            return {
              id : variant.id,
              variantProperties: _.pick(Object.keys(variant), _.pick(variant, ['name', 'sellingPrice', 'costPrice', 'properties', 'quantity'])
            }
          })
        }
      })),
      action_type: "edit"
    }, {transacting: transaction})
  }
  return Base.transaction(transaction => {
    return when.map(input, item => {
      return when.join(
        updateItems(item, transaction),
        updateVariants(item.variants, transaction)
        addUserAction(item, transaction)
      )
    })
  })

}



