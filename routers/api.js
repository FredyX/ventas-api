const router = require('express').Router();
const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiAuthRouter = require('./api/auth');
const apiProfilePicturesRouter = require('./api/profile_pictures');
const apiImagesRouter = require('./api/images');
/* ejemplo router.use('/departaments', middlewares.checkToken,apiDepartamens);*/
router.use('/users', apiUsersRouter);
router.use('/auth', apiAuthRouter);
router.use('/profile_pictures', apiProfilePicturesRouter);
router.use('/images',apiImagesRouter);
module.exports = router;