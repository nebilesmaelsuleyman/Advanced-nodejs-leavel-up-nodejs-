const express = require('express')
const router = express.Router()

const { createBlogSchema } = require('./../validation/blogvalidation')
const { blogvalidation } = require('./../validation')
const validate = require('./../midlwares/validate')
const { blogController } = require('./../controller')
const auth = require('./../midlwares/auth')
const { uservalidation, authValidation } = require('./../validation')
const { authController } = require('./../controller')
const { authLimiter } = require('../midlwares/limiter')

router.post(
	'/auth/register',
	validate(uservalidation.createUserSchema),
	authController.register
)
router.get(
	'/auth/login',
	authLimiter,
	validate(authValidation.loginSchema),
	authController.login
)
router.post(
	'/auth/refresh-token',
	validate(authValidation.refreshTokenSchema),
	authController.refreshToken
)

router.get('/', blogController.helllow)
router.get('/blogs', blogController.getBlogs)
router.post('/blog', validate(blogvalidation), blogController.createBlog)

module.exports = router
