const catchAsync =require('./../utils/catchAsync')
const httpStatus= require('http-status')
const {userservice}= require('./../services')

const register =catchAsync(async (req,res,next)=>{
    const user= await userservice. createUser(req.body);
    res.status(201).json({
        user
    })
    if(!user){
        res.status(400).json({
            message:'error while creating '
        })
    }
next()
})
module.exports ={
    register
}