const express = require('express');
const app = express();
const ApiError = require('./utils/ApiError');
const blogRouter = require('./routes/blogroutes');
const authRouter =require('./routes/authroute')
const httpStatus=require('http-status')
const { errorHandler, errorConverter } = require('./midlwares/errors');
const morgan =require('./config/morgan')
const passport = require('passport')
const {jwtStrategy}= require('./config/passport')

app.use(morgan); 
app.use(passport,initialize());
passport.use('jwt',jwtStrategy)

app.use(express.json());
app.use(blogRouter);
app.use(authRouter)

app.use((req,res, next)=>{
    next(new ApiError(404,"NOT FOUND"))
})
app.use(errorConverter)
app.use(errorHandler)

module.exports= app;