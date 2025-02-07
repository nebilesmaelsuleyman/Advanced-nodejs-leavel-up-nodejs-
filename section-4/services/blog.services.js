const {Blog} = require('./../model');

const createBlog = async (body) => {
    await Blog.create(body);

};

const getBlogs = async () => {
    const blogs = await Blog.find({});
};


module.exports = {
createBlog,
getBlogs,
};