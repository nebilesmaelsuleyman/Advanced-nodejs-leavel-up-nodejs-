const express = require('express');
const router = express.Router();

const {createBlogSchema}=require('./../validation/blogvalidation')
const {blogvalidation}=require('./../validation')
const validate= require('./../midlwares/validate')
const { blogController} = require('./../controller');
router.get('/',blogController.helllow)
router.get('/blogs',blogController.getBlogs);
router.post('/blog', validate(blogvalidation),blogController.createBlog);

module.exports = router;
