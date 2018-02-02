'use strict';

const service = require('../services/variants')
const httpStatus = require('http-status')
const validator = require("../helpers/validator")


exports.create =  (req, res) => {
  const input = req.body
  req.user = {id: 1}
  if (!validator.isValidVariant(input)) {
    res.status(httpStatus.BAD_REQUEST).json({code: "invalid_request", message: "Invalid details for item."}).end()
    return false;
  }

  service.create(input, req.user.id)
    .then(() => {
      res.status(httpStatus.OK).json({
        code: "200",
        message: "User account created successfully.",
      }).end()
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({code: "500", message: "Unknown err."}).end()
    })
}


exports.update = (req, res) => {
  const input = _.pick(req.body, ['name', 'sellingPrice', 'costPrice', 'properties', 'qunatity'])
  if(_.isEmpty(input)){
    res.status(httpStatus.BAD_REQUEST).json({code: "invalid_request", message: "Invalid update request for item."}).end()
    return false;
  }
  service.update(input, req.params.itemId, req.params.variantId, req.body.userId)
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
