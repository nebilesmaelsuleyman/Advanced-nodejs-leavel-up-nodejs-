const express = require('express');
const router = express.Router();

const { createBlog, getBlogs } = require('./../controller/blogcontroller');
router.get('/blogs', getBlogs);
router.post('/blog', createBlog);

module.exports = router;
