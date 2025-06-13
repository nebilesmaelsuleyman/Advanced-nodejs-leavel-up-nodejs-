const validator = require('validator');

const password = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      'Password should be at least 8 characters with one uppercase, one lowercase letter, one number, and one special character.',
    );
  }
  return value;
};

const objectId = (value, helpers) => {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    // Fixed regex
    return helpers.message(
      'Invalid ObjectId: must be a valid MongoDB ObjectId',
    );
  }
  return value;
};

module.exports = {
  password,
  objectId,
};
