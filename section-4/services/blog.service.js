const fs = require('fs')
const path = require('path')
const { Blog } = require('./../model');
const ApiError = require('../utils/ApiError');
const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
}
const uploadFile = async(filePaht)=>{
}
const getReadableFileStream= async (filename) => {
 const filepath= path.join(__dirname, '..','uploads',filename)
 console.log('filepath',filepath)

 if(!fs.existsSync(filepath)){
   throw new ApiError(404,'File not found')
 }
 const stream = fs.createReadStream(filepath);
 return stream
}

module.exports = {
  createBlog,
  getBlogs,
  uploadFile,
  getReadableFileStream
};
