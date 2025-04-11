const User = require('./usermodel')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		ref: 'User',
		required: true,
	},
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
