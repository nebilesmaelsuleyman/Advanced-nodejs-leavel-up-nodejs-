const passport = require('passport');
const ApiError = require('./../utils/ApiError');

const auth = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || info || !user) {
          return reject(new ApiError(401, 'Please authenticate')); // Directly reject with the error
        }
        req.user = user;
        resolve();
      })(req, res, next); // Call the passport authenticate function
    });
    next(); // Call next if authentication is successful
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

module.exports = auth;
