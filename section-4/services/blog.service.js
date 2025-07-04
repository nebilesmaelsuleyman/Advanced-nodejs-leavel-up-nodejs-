const fs = require('fs')
const path = require('path')
const { Blog } = require('./../model');
const ApiError = require('../utils/ApiError');
const sharp = require('sharp')


const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
}

// implemented by worker , in background
// const uploadFile = async (file) => {
//   const filename = `image-${Date.now()}.webp`;
//   const outputPath = `${__dirname}/../uploads/${filename}`;
//   await sharp(file.buffer).resize(600).webp({ quality: 80 }).toFile(outputPath);
//   return filename;
// };


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
//   uploadFile,
  getReadableFileStream
};
