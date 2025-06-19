const express = require('express');
const router = express.Router();

const { createBlogSchema } = require('./../validation/blogvalidation');
const { blogvalidation } = require('./../validation');
const validate = require('./../midlwares/validate');
const { blogController } = require('./../controller');
const auth = require('./../midlwares/auth');
const { uservalidation, authValidation } = require('./../validation');
const { authController } = require('./../controller');
const { authLimiter } = require('../midlwares/limiter');
const upload = require('../utils/multer')



router.post(
  '/auth/register',
  validate(uservalidation.createUserSchema),
  authController.register,
);
router.post(
  '/auth/login',
  authLimiter,
  validate(authValidation.loginSchema),
  authController.login,
);
router.post(
  '/auth/refresh-token',
  validate(authValidation.refreshTokenSchema),
  authController.refreshToken,
);
router.get(
  '/blogs',
  auth,
  validate(blogvalidation.getBlogSchema),
  blogController.getBlogs,
);
router.post('/blog', validate(blogvalidation), blogController.createBlog);
router.post('/cover-image', upload.single('coverImage'), blogController.uploadFile)
module.exports = router;
