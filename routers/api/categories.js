const {Router} = require('express');
const {getAllCategories,getCategoriesId} = require('../../controllers/categories');
const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoriesId);

module.exports = router;


