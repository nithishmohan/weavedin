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
    .then(user => {
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
