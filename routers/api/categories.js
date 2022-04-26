
const router = require('express').Router();
const { check } = require('express-validator');
const {doCategoryIdExist} = require('../../helpers/dbValidators');
const { validateFields, validateJwt, validateAdmin } = require('../../middlewares/');
const {
    getAllCategories,
    getCategoriesId,
    categoriesPutUpdate,
    categoriesDelete,
    categoriesPostAdd
      } = require('../../controllers/categories');

router.get('/', getAllCategories);
router.get('/:id', getCategoriesId);

router.delete('/:id', [
    validateJwt,
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doCategoryIdExist),
    validateFields,
    validateAdmin,
], categoriesDelete);

router.put('/:id', [
    validateJwt,    
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('categorie_name').not().isEmpty().withMessage('El nombre de la categoria es obligatorio'),
    check('id').not().isEmpty().withMessage('El id de la categoria es obligatorio'),
    check('id').custom(doCategoryIdExist),
    validateFields,
    validateAdmin,
], categoriesPutUpdate);

router.post('/', [
    validateJwt,
    check('categorie_name').not().isEmpty().withMessage('El nombre de la categoria es obligatorio'),
    check('id').not().isEmpty().withMessage('El id de la categoria es obligatorio'),
    check('id').custom(doCategoryIdExist),
    validateAdmin,
    validateFields
], categoriesPostAdd);

module.exports = router;


