const errorHandler =(err,req,res,next)=>{
    const {statusCode,message}=err;

    const response={
        error:true,
        code:statusCode,
        message,
        ...(config.env=='development'&&{stack:err.stack})
    };
    if(config.env=== 'development'){
        console.log(err);
    }
    res.status(statusCode).send(response);
};

module.exports={
    errorHandler,
}
