const validateFields = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt');
const validateAdmin = require('../middlewares/validateAdmin');

module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateAdmin,
}