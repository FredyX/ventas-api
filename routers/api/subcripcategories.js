const {agregarSusCategories,actualizarSusCategories} = require('../../controllers/subcriptions');
const router = require('express').Router();

router.post('/categories/',agregarSusCategories);
router.put('/categories/',actualizarSusCategories);
module.exports = router;