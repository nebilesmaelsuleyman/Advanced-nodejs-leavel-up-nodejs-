const express =require('express')
const router =express.Router();
const validate= require('./../midlwares/validate')
// const {createUserSchema}=require('./../validation')
const {uservalidation}= require('./../validation')
const {authController}=require('./../controller')

router.post('/auth/register',validate(uservalidation.createUserSchema),authController.register)
router.get('/auth/login',authController.login)

module.exports=router
