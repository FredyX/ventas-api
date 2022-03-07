const router = require('express').Router();
const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiProfilePicturesRouter = require('./api/profile_pictures');
/* ejemplo router.use('/departaments', middlewares.checkToken,apiDepartamens);*/
router.use('/users',apiUsersRouter);
router.use('/profile_pictures',apiProfilePicturesRouter);
module.exports = router;