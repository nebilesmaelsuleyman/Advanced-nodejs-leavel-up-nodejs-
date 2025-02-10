const {User}=require('../model')

const createUser= async (req,res,next)=>{
    console.log('creating user...')
    const user= await User.create(body)
    next();
}
module.exports ={
    createUser
}