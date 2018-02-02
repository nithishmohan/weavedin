'use strict';
const schemaValidator = require('json-schema').validate;

exports.isValidItem = (input) => {
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "brand": {
        "type": "string",
        "required": true
      },
      "category": {
        "type": "string",
        "required": true
      },
      "product_code": {
        "type": "string",
        "required": true
      }
    }
  }

  return schemaValidator(input, schema)
}

exports.isValidVariant = () => {
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "selling_price": {
        "type": "integer",
        "required": true
      },
      "cost_price": {
        "type": "integer",
        "required": true
      },
      "properties": {
        "type": "object",
        "required": true
      },
      "quantity": {
        "type" : "integer",
        "required" : true
      },
    }
  }

  return schemaValidator(input, schema);
}




