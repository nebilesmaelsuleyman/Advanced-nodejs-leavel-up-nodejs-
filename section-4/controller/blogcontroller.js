const Blog = require('./../model/blogmodel');
const blogServices= require('./../services')
const httpStatus= require('http-status')
const catchAsync= require('./../utils/catchAsync')
const createBlog =catchAsync( async (req, res) => {

    await blogServices.createBlog(req.body);
    res
    .status(httpStatus.Created)
    .send({ success: true, message: 'Blog created successfyly' });
    next()

});
const helllow=catchAsync((req,res,next)=>{
    res.send('hellow margaret')
    console.log('hellow')
    next()
})
const getBlogs =catchAsync( async (req, res) => {

    const blogs = await blogServices.getBlogs();
    res
    .status(httpStatus.Ok) .json(blogs);
    next()
});

module.exports = {
createBlog,
getBlogs,
helllow
};