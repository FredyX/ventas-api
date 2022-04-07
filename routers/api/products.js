const router = require('express').Router();
const { check } = require('express-validator');
const { doUserIdExist, doProductIdExist , doDepartmentIdExist, sameUserProduct } = require('../../helpers/dbValidators');
const { validateFields, validateJwt } = require('../../middlewares/');
const {
    fileUpload,
    obtenerImagenes,
    productsGetId,
    productsGetUser,
    productsPostAdd,
    productsPutUpdate,
    productsDelete,
    productsGetIdDetalle} = require('../../controllers/products');


//obtiene un producto por id
router.get('/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doProductIdExist)
], productsGetId);

//devuelve los detalles de un producto
router.get('/detalle/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doProductIdExist)
], productsGetIdDetalle);


//obtiene los productos de un usuario
router.get('/user/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doUserIdExist),
    validateFields
], productsGetUser);

//agrega un producto
router.post('/', fileUpload, [
    validateJwt,
    check('product_name').not().isEmpty().withMessage('El nombre del producto es obligatorio'),
    check('product_description').not().isEmpty().withMessage('La descripción del producto es obligatoria'),
    check('price').not().isEmpty().withMessage('El precio del producto es obligatorio'),
    check('price').isNumeric().withMessage('El precio del producto debe ser un número'),
    check('department_id').not().isEmpty().withMessage('El id del departamento es obligatorio'),
    check('department_id').custom(doDepartmentIdExist),
    check('state').not().isEmpty().withMessage('El estado del producto es obligatorio'),
    check('categories').not().isEmpty().withMessage('Las categorías del producto son obligatoria'),
    validateFields
], productsPostAdd);

router.get('/images/:id', obtenerImagenes);


//actualiza un producto
router.put('/:id',fileUpload, [
    validateJwt,    
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    sameUserProduct,
    check('product_name').not().isEmpty().withMessage('El nombre del producto es obligatorio'),
    check('product_description').not().isEmpty().withMessage('La descripción del producto es obligatoria'),
    check('price').not().isEmpty().withMessage('El precio del producto es obligatorio'),
    check('price').isNumeric().withMessage('El precio del producto debe ser un número'),
    check('department_id').not().isEmpty().withMessage('El id del departamento es obligatorio'),
    check('department_id').custom(doDepartmentIdExist),
    check('state').not().isEmpty().withMessage('El estado del producto es obligatorio'),
    check('categories').not().isEmpty().withMessage('Las categorías del producto son obligatoria'),
    validateFields
], productsPutUpdate);

//elimina un producto
router.delete('/:id', [
    validateJwt,
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    sameUserProduct,
    validateFields
], productsDelete);

module.exports = router;