const catchAsync = require('./../utils/catchAsync');
const { blogservice } = require('./../services');
const path = require('path')
const {ImageProcessor}= require('../bacground-tasks');
const workers = require('../bacground-tasks/workers')
const ApiError = require('../utils/ApiError')


const createBlog = catchAsync(async (req, res) => {
  await blogservice.createBlog(req.body, req.user.id);
  res.status(201).send({ success: true, message: 'Blog created successfuly' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogservice.getBlogs(req.body.userId);
  res.status(200).json(blogs);
});



const uploadFile = catchAsync(async (req, res)=>{

if(!req.file){
throw new ApiError(404,'file not found')}
const filename=`image-${Date.now()}.webp`

 await ImageProcessor.Queue.add('ImageProcessorJob',{
filename,
file:req.file
})

// redis-server  --- for running redis server 
//redis-cli shutdown for shutting down the server

await workers.start()
res.status(200).json({filename:filename});
})




const getFile = catchAsync(async (req,res)=>{
const {filename}= req.params

const stream = await blogservice.getReadableFileStream(filename)

const ext = path.extname(filename).replace('.', ''); // remove the dot
const contentType = `image/${ext}`;
console.log(contentType)
res.setHeader('content-Type',contentType)

stream.pipe(res)
})


module.exports = {
  createBlog,
  getBlogs,
  uploadFile,
  getFile
};
