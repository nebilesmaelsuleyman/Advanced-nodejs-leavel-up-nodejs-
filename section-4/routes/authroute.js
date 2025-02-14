const express =require('express')
const router =express.Router();
const validate= require('./../midlwares/validate')
// const {createUserSchema}=require('./../validation')
const {uservalidation, authValidation}= require('./../validation')
const {authController}=require('./../controller')
const auth= require('./../midlwares/auth')




router.post('/auth/register',validate(uservalidation.createUserSchema),authController.register)
router.get('/auth/login', validate(authValidation.loginSchema),authController.login)
router.post('/auth/refresh-token',validate(authValidation.refreshTokenSchema),authController. refreshToken)

module.exports=router
