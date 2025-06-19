const catchAsync = require('./../utils/catchAsync');
const { blogservice } = require('./../services');

const createBlog = catchAsync(async (req, res) => {
  await blogservice.createBlog(req.body, req.user.id);
  res.status(201).send({ success: true, message: 'Blog created successfuly' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogservice.getBlogs(req.body.userId);
  res.status(200).json(blogs);
});

const uploadFile = catchAsync(async (req, res)=>{


const filePath = await blogservice.uploadFile(req.body)
if(!req.file){
throw new ApiError(404,'file not found')}

res.status(200).json({filePath:`/uplaods${req.file.filename}`});

})

module.exports = {
  createBlog,
  getBlogs,
  uploadFile
};
