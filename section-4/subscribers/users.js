
const transporter = require('../utils/email-transporter')
const config = require('../config/config')

const signUp = async (user)=>{
  console.log('signup event triggered for :',user.email)
  await transporter.sendMail({from:config.email,
  to:user.email,
  subject:'succesfully registered',
  text:"thanks for signing up"},
  )
};

module.exports ={
signup:signUp}