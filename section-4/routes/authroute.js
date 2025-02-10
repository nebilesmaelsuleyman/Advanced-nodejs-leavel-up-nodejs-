const express =require('express')
const Router =express.Router();
const validate= require('./../midlwares/validate')
const {createUserSchema}=require('./../validation')
const {authController}=require('./../controller')

Router.post('auth/register',validate(createUserSchema),authController.register)

module.exports=Router