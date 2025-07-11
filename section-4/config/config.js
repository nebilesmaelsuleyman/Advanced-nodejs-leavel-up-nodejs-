require('dotenv').config();
const { envValidation } = require('./../validation');
const { value: envVars, error } = envValidation.validate(process.env);
const logger = require('./logger');

if (error) {
  logger.error(error);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_EXPIRATION_DAYS,
  },
  rateLimiter: {
    maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
    maxAttemptsByIpUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
    maxAttemptsPerEmail: envVars.MAX_ATTEMPTS_PER_EMAIL,
  },
  cspOptions: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline"],
      scriptSrc: ["'self'", "'unsafe-inline"],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
    },
  },
  redis:{
  host:envVars.REDIS_HOST,
  port:envVars.REDIS_PORT}
};
