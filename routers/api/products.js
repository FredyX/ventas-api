const router = require('express').Router();
const { check } = require('express-validator');
const { doUserIdExist, doProductIdExist, doCategoryIdExist , doDepartmentIdExist } = require('../../helpers/dbValidators');
const { validateFields, validateJwt, validateAdmin /*, validateSameUser*/} = require('../../middlewares/');
const { 
        fileUpload,
        obtenerImagenes,
        productsGetAll,
        productsGetId,
        productsGetCategorie,
        productsGetUser,
        productsPostAdd,
        productsPutUpdate, 
        productsDelete,
        productsGetIdDetalle } = require('../../controllers/products');


//obtiene un producto por id
router.get('/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doProductIdExist)
], productsGetId);

router.get('/detalle/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doProductIdExist)
], productsGetIdDetalle);

//obtiene n productos de una categoria
router.get('/category/:categories&:department&:n', [
    check('categories').not().isEmpty().withMessage('Las categorias son obligatorias'),
    validateFields
], productsGetCategorie);

//obtiene n productos segun un termino de busqueda
router.get('/search/:search&:n', [
    check('search').not().isEmpty().withMessage('El campo de busqueda es obligatorio'),
    validateFields
], productsGetUser);

//obtiene los productos de un usuario
router.get('/user/:id', [
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doUserIdExist)
], productsGetUser);

//agrega un producto
router.post('/',fileUpload ,[
//    validateJwt,
    check('product_name').not().isEmpty().withMessage('El nombre del producto es obligatorio'),
    check('product_description').not().isEmpty().withMessage('La descripción del producto es obligatoria'),
    check('price').not().isEmpty().withMessage('El precio del producto es obligatorio'),
    check('price').isNumeric().withMessage('El precio del producto debe ser un número'),
    check('department_id').not().isEmpty().withMessage('El id del departamento es obligatorio'),
    check('department_id').custom(doDepartmentIdExist),
    check('state').not().isEmpty().withMessage('El estado del producto es obligatorio'),
    check('categories').not().isEmpty().withMessage('Las categorías del producto son obligatoria'),
    //check('image').not().isEmpty().withMessage('Las imagenes del producto son obligatorias'),
    validateFields
], productsPostAdd);

router.get('/images/:id',obtenerImagenes);


//actualiza un producto
// router.put('/:id', [
//     validateJwt,
//     check('id').not().isEmpty().withMessage('El id es obligatorio'),
//     check('id').custom(doProductIdExist),
//     check('user_seller_id').custom(validateSameUser),
//     validateFields
// ], productsPutUpdate);

// //elimina un producto
// router.delete('/:id', [
//     validateJwt,
//     check('id').not().isEmpty().withMessage('El id es obligatorio'),
//     check('id').custom(doProductIdExist),
//     check('user_seller_id').custom(validateSameUser),
//     validateFields
// ], productsDelete);
module.exports = router;