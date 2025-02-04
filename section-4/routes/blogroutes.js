const express = require('express');
const router = express.Router();

const {createBlogSchema}=require('./../validation/blogvalidation')
const { createBlog, getBlogs } = require('./../controller/blogcontroller');
router.get('/blogs', getBlogs);
router.post('/blog', createBlog);

module.exports = router;
