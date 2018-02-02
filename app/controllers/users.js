'use strict';

const service = require('../services/users')
const httpStatus = require('http-status')


exports.getActivites =  (req, res) => {
  const timeRange = {from : req.body.from, to : req.body.to}

  service.getActivites(timeRange, req.body.userId)
    .then(activites => {
      res.status(httpStatus.OK).json({
        code: "200",
        message: "User account created successfully.",
      }).end()
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({code: "500", message: "Unknown err."}).end()
    })
}

