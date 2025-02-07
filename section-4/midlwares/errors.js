const ApiError = require("../utils/ApiError");
const mongoose =require('mongoose')
const httpStatus=require('http-status')
const logger=require('./../config/logger')
const config=require('./../config/config')
const errorConverter=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
        const statusCode=
        error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message =error.message || httpStatus[statusCode];
        error= new ApiError(statusCode, message,false,error.stack)
    }
}

const errorHandler =(err,req,res,next)=>{
    const {statusCode,message}=err;
    const response={
        error:true,
        code:statusCode,
        message,
        ...(config.env=='development'&&{stack:err.stack})
    };

    res.locals.errorMessage= message;
    if(config.env=== 'development'){
        logger.error(err);
    }
    res.status(statusCode).send(response);
    next()
};

module.exports={
    errorHandler,
    errorConverter
}
