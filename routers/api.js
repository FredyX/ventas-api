const router = require('express').Router();
const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');

/* ejemplo router.use('/departaments', middlewares.checkToken,apiDepartamens);*/
router.use('/users',apiUsersRouter);
module.exports = router;