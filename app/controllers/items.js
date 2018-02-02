'use strict';

const service = require('../services/items')
const httpStatus = require('http-status')
const validator = require("../helpers/validator")
const _ = require('lodash')


exports.create =  (req, res) => {
  const input = req.body
  req.user = {id: 1}
  if (!validator.isValidItem(input)) {
    res.status(httpStatus.BAD_REQUEST).json({code: "invalid_request", message: "Invalid details for item."}).end()
    return false;
  }

  service.create(input, req.user.id)
    .then(() => {
      res.status(httpStatus.OK).json({
        code: "200",
        message: "Item created successfully.",
      }).end()
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({code: "500", message: "Unknown err."}).end()
    })
}

exports.update = (req, res) => {
  const input =req.body.map(item => {
    const itemValue = _.pick(item, ['name', 'brand', 'category', 'productCode', 'id'])
    const variantsValue = !_.isEmpty(item.variants )? item.variants.map(variant => _.pick(variant, ['name', 'sellingPrice', 'costPrice', 'properties', 'quantity', 'id'])) : null
    return {item : itemValue, variants: variantsValue}
  })
  if(_.isEmpty(input)){
    res.status(httpStatus.BAD_REQUEST).json({code: "invalid_request", message: "Invalid update request for item."}).end()
    return false;
  }
  service.update(input, req.body.userId)
    .then(() => {
      res.status(httpStatus.OK).json({
        code: "200",
        message: "User account created successfully.",
        auth: true,
        token: user.auth_token
      }).end()
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({code: "500", message: "Unknown err."}).end()
    })
}
