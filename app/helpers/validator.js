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
      "productCode": {
        "type": "string",
        "required": true
      },
      "variants" : {
        "type" : "object",
        "required" : false
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
      "sellingPrice": {
        "type": "integer",
        "required": true
      },
      "costPrice": {
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




