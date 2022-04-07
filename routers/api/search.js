const router = require('express').Router();
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/');
const {productsSearch} = require('../../controllers/products');

//search = frase o palabra a buscar
//categories = categorias a buscar en formato 1,2,3
//departament = departamento a buscar en formato 1,2,3
//score = puntaje minimo a buscar
//page = pagina a buscar

//localhost:3001/api/search/nuevo producto&1,2,3&1,7&5&1

router.get('/:search&:categories&:departments&:score', [
    check('search').not().isEmpty().withMessage('El campo de busqueda es obligatorio'),
    validateFields
], productsSearch);

module.exports = router;