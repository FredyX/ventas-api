const router = require('express').Router();
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/');
const {productsSearch} = require('../../controllers/products');

router.get('/:search&:categories&:departments&:score&:page', [
    check('search').not().isEmpty().withMessage('El campo de busqueda es obligatorio'),
    validateFields
], productsSearch);

module.exports = router;