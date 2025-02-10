// const Blog = require('./../model/blogmodel');
const {blogService}= require('./../services')
const httpStatus= require('http-status')
const catchAsync= require('./../utils/catchAsync')
const {blogservice}= require('./../services')
// const {createBlog , getBlogs}=require('./../services/blog.services')
const Blog= require('./../model/blogmodel');

const createBlog =catchAsync( async (req, res,next) => {

    const Blogs= await blogservice.createBlog(req.body)
    res
    .status(201)
    .json({ success: true, message: 'Blog created successfyly',data:Blogs });

});
const helllow=catchAsync((req,res,next)=>{
    res.send('hellow margaret')
    console.log('hellow')

})
const getBlogs =catchAsync( async (req, res) => {

    const blogs = await blogservice.getBlogs();
    res
    .status(200) .json({
        status:'success',
        data:blogs
    });

});

module.exports = {
createBlog,
getBlogs,
helllow
};