const router = require('express').Router();
const apiUsersRouter = require('./api/users');
const apiAuthRouter = require('./api/auth');
const apiProductsRouter = require('./api/products');
const apiImagesRouter = require('./api/images');
const apiCategoriesRouter = require('./api/categories');
const apiDepartmentsRouter = require('./api/departments');
const apiSearchRouter = require('./api/search');
const apiSuscription = require('./api/suscriptions');
const apiSuscriptionC = require('./api/subcripcategories');
const apiComplaintRouter = require('./api/complaints');
const apiReasonRouter = require('./api/reasons');
const apiReporteRouter = require('./api/reporters');
const apiReviewsRouter = require('./api/reviews');

router.use('/users', apiUsersRouter);
router.use('/auth', apiAuthRouter);
router.use('/products', apiProductsRouter);
router.use('/images',apiImagesRouter);
router.use('/categories', apiCategoriesRouter);
router.use('/departments', apiDepartmentsRouter);
router.use('/search', apiSearchRouter);
router.use('/suscriptions', apiSuscription);
router.use('/suscription',apiSuscriptionC);
router.use('/complaints',apiComplaintRouter);
router.use('/reasons', apiReasonRouter);
router.use('/reporters', apiReporteRouter);
router.use('/reviews', apiReviewsRouter);
module.exports = router;