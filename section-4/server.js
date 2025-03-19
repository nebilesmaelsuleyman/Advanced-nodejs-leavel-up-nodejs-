const express = require('express');
const app = express();
const ApiError = require('./utils/ApiError');
const AllRouter = require('./routes/blogroutes');
const httpStatus=require('http-status')
const { errorHandler, errorConverter } = require('./midlwares/errors');
const morgan =require('./config/morgan')
const passport = require('passport')
const {jwtStrategy}= require('./config/passport')


// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(express.json());
app.use(AllRouter);

// path not found 404
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);
app.use(errorConverter);

module.exports= app;