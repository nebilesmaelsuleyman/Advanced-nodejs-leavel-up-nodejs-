require('dotenv').config();
const {envValidation} = require('./../validation');
const { value: envVars, error } = envValidation.validate(process.env);
const logger =require('./logger')
if (error) {
  logger.error(error);
}


module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
  jwt:{
    secret:envVars.JWT_SECRET,
    accessExpirationMinutes:envVars.JSWT_ACCESS_EXPIRATION_MINUTES
  }
};
