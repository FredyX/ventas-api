const { Router } = require('express');
const { check } = require('express-validator');
const { imagesPost, imagesGet, getImagestId } = require('../../controllers/images');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = Router();

const disktorage =  multer.diskStorage({
    destination: path.join(__dirname, '../../public/images'),
    filename: (req, file, cb) => {
        cb(null,Date.now()+'-'+file.originalname)
    },    
});

const fileUpload = multer({
    storage: disktorage
}).single('image');

router.post('/upload',imagesPost);

router.get('/images/get', (req, res) => {
    
});
router.get('/:id',getImagestId);


module.exports = router;