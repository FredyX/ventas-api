const router = require('express').Router();
const apiUsersRouter = require('./api/users');
const apiAuthRouter = require('./api/auth');
const apiProfilePicturesRouter = require('./api/profile_pictures');
const apiProductsRouter = require('./api/products');
const apiImagesRouter = require('./api/images');
const apiCategoriesRouter = require('./api/categories');

router.use('/users', apiUsersRouter);
router.use('/auth', apiAuthRouter);
router.use('/profile_pictures', apiProfilePicturesRouter);
router.use('/products', apiProductsRouter);
router.use('/images',apiImagesRouter);
router.use('/categories', apiCategoriesRouter);

module.exports = router;