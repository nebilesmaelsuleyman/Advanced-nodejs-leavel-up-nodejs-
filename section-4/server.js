const express = require('express');
const app = express();
const ApiError = require('./utils/ApiError');
const blogRouter = require('./routes/blogroutes');
const httpStatus=require('http-status')
const { errorHandler, errorConverter } = require('./midlwares/errors');

app.use(express.json());
app.use(blogRouter);
app.use((req,res, next)=>{
    next(new ApiError(404,"NOT FOUND"))
})
app.use(errorConverter)
app.use(errorHandler)

module.exports= app;