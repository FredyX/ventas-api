const router = require('express').Router();
const apiUsersRouter = require('./api/users');
const apiAuthRouter = require('./api/auth');
const apiProfilePicturesRouter = require('./api/profile_pictures');
const apiProductsRouter = require('./api/products');

router.use('/users', apiUsersRouter);
router.use('/auth', apiAuthRouter);
router.use('/profile_pictures', apiProfilePicturesRouter);
router.use('/products', apiProductsRouter);
router.use('/images',apiImagesRouter);
module.exports = router;