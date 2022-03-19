const { Router } = require('express');
const { check } = require('express-validator');
const { imagesPost, imagesGet, getImagesProductId } = require('../../controllers/images');
const router = Router();

router.post('/upload',imagesPost);

router.get('/:id',getImagestId);
//router.get('/product/:id',getImagesProductId);

module.exports = router;