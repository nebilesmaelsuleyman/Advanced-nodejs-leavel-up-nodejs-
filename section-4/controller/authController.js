const catchAsync =require('./../utils/catchAsync')
const httpStatus= require('http-status')
const {userservice,tokenService}= require('./../services');
const ApiError = require('../utils/ApiError');
const {authService} =require('./../services')


const register =catchAsync(async (req,res,next)=>{
    const user= await userservice.createUser(req.body);
    const token = tokenService.generateAuthToken(user._id);
    res.status(201).json({
        user,
        token
    })

})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    // generate token
    const token = await tokenService.generateAuthToken(user._id);
    res.status(200).send({ user, token });
  });


module.exports ={
    register,
    login
}