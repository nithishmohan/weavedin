'use strict';
const schemaValidator = require('json-schema').validate;

exports.isValidItem = function(input) {
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

  return schemaValidator(input, schema);
}




