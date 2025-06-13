const express = require('express');
// const ApiError = require('./utils/ApiError')
const AllRouter = require('../routes/blogroutes');
const { errorHandler, errorConverter } = require('../midlwares/errors');
// const morgan = require('./config/morgan')
const passport = require('passport');
const { jwtStrategy } = require('../config/passport');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize')
const { cspOptions } = require('../config/config');
const cors = require('cors');




module.exports =async (app)=>{
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(express.json());

//security
app.use(xss());

app.use(helmet.contentSecurityPolicy(cspOptions));
// app.use(mongoSanitize({ allowDots: true, replaceWith: '_' }))
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());

if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: 'url' }));
  app.options('*', cors({ origin: 'url' }));
} else {
  app.use(cors());
  app.options('*', cors());
}

app.use(AllRouter);

// path not found 404
app.use((req, res, next) => {
  next();
});

app.use(errorHandler);
app.use(errorConverter);

return app


}
