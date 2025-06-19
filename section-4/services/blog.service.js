const { Blog } = require('./../model');
const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
}
const uploadFile = async(filePaht)=>{
}

module.exports = {
  createBlog,
  getBlogs,
  uploadFile
};
