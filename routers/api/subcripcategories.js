const {agregarSusCategories} = require('../../controllers/subcriptions');
const router = require('express').Router();

router.post('/categories/',agregarSusCategories);

module.exports = router;