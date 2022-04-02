const router = require('express').Router();
const apiUsersRouter = require('./api/users');
const apiAuthRouter = require('./api/auth');
const apiProfilePicturesRouter = require('./api/profile_pictures');
const apiProductsRouter = require('./api/products');
const apiImagesRouter = require('./api/images');
const apiCategoriesRouter = require('./api/categories');
const apiDepartmentsRouter = require('./api/departments');
const apiSearchRouter = require('./api/search');


router.use('/users', apiUsersRouter);
router.use('/auth', apiAuthRouter);
router.use('/profile_pictures', apiProfilePicturesRouter);
router.use('/products', apiProductsRouter);
router.use('/images',apiImagesRouter);
router.use('/categories', apiCategoriesRouter);
router.use('/departments', apiDepartmentsRouter);
router.use('/search', apiSearchRouter);

module.exports = router;