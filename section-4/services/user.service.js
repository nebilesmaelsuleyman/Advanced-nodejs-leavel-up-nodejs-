const { User } = require('./../model');
const ApiError = require('../utils/ApiError');

const EventEmitter = require('../utils/EventEmitter')
const transporter= require('../utils/email-transporter')

const createUser = async (userBody) => {
  console.log('creating user...');
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(400, 'Emial is already taken');
  }
  const user = await User.create(userBody);
  await transporter.sendMail({from:config.email,
  to:user.email,
  subject:'succesfully registered',
  text:"thanks for signing up"},(error,info)=>{
  if(error){
  return console.log(error)}})
  console.log('Email sent:' + info.response)
  return user;
};




const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
