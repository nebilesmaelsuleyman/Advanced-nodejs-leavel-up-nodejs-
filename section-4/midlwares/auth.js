const passport = require('passport')
const ApiError =require('./../utils/ApiError')

const verifyCallBack= (req,resolve,reject)=>async (err,user,info)=>{
if(err || info || !user){
    throw new ApiError(401,'please authenticate')
}

req.user =user;
resolve();

}
const auth= async(req,res,next)=>{
    return new promise((resolve,reject)=>{
        passport.authenticate('jwt',{session:false},verifyCallBack(req,resolve,reject))
        (req,res,next);
    }).then(()=>next())
    .catch((error)=>next(error));
}
module.exports =auth