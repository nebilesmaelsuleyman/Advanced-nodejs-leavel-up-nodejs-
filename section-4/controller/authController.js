const catchAsync =require('./../utils/catchAsync')
const httpStatus= require('http-status')
const {userservice,tokenService}= require('./../services')

const register =catchAsync(async (req,res,next)=>{
    const user= await userservice.createUser(req.body);
    const token = tokenService.generateAuthToken(user._id);
    res.status(201).json({
        user,
        token
    })

})

module.exports ={
    register
}