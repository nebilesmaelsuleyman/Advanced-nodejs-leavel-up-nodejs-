const jwt =require('jwt')
const dayjs= require('dayjs');

const config =require('./../config/config');
const {tokenTypes}=require('./../config/tokens')

const generateAuthToken =(userId)=>{
    const payload ={
        sub:userId,
        iat:dayjs().unix(),
        exp:dayjs().add(config.jwt.accessExpirationMinutes,'minutes').unix(),
        type:tokenTypes.ACCESS
    }
    return jwt.sign(payload, config.jwt.secret)
}

module.exports ={
    generateAuthToken
}