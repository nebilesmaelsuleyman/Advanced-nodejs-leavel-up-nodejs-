
const joi = require('joi');

// Middleware function to validate the request against a schema
const validate = (schema) => (req, res, next) => {
  // Extract the keys from the schema
const keys = Object.keys(schema);

  // Reduce the request object to only the relevant keys
const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
    obj[key] = req[key];
    }
    return obj;
}, {});

  // Validate the object against the schema
const { value, error } = joi.compile(schema).validate(object);

  // If there is an error, respond with a 400 status and the error details
if (error) {
    const errors = error.details.map((detail) => {
    return { key: detail.context.key, message: detail.message };
    });
    next({
      statusCode:400,
      message:errors
    })
  
}

  // If no error, call next to proceed to the controller
return next();
};

module.exports = validate