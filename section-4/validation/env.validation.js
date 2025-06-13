const joi = require('joi');
const envVarSchema = joi
  .object({
    DB_CONNECTION: joi.string().required(),
    PORT: joi.number().positive().default(3000),
    NODE_ENV: joi
      .string()
      .valid('development', 'production')
      .default('development'),
  })
  .unknown();
module.exports = envVarSchema;
