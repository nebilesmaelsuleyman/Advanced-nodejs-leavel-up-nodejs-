const catchAsync=(fn)=>(req,res,next)=>{
    promise.resolve(fn(req,res, next)).catch((err)=>{
        next(err);
    })
}
module.exports= catchAsync;