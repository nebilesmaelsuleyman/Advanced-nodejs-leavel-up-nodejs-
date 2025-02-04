const ApiError = require("../utils/ApiError");

const errorConverter=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
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
        console.log(err);
    }
    res.status(statusCode).send(response);
};

module.exports={
    errorHandler,
    errorConverter
}
