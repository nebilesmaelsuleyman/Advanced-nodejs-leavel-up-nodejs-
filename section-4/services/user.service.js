const {User}=require('./../model')
const ApiError =require('../utils/ApiError')

const createUser= async (userBody)=>{
    console.log('creating user...')
    if(await User.isEmailTaken(userBody.email)){
        throw new ApiError(400, 'Emial is already taken')
    }
    const user= await User.create(userBody)
    return user

}
const getUserByEmail =async (email)=>{
    return await User.findOne({email});
}

const getUserById = async (id) => {
    return await User.findById(id)
}
;
module.exports ={
    createUser,
    getUserByEmail,
    getUserById
}