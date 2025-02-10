const catchAsync =require('./../utils/catchAsync')
const httpStatus= require('http-status')
const {userservice}= require('./../services')

const register =catchAsync(async (req,res,next)=>{
    const user= await userservice.createUser(req.body);
    res.status(201).json({
        user
    })

})
module.exports ={
    register
}