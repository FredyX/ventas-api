const {agregarReview, obtenerReview} = require('../../controllers/reviews');
const router = require('express').Router();

router.get('/',obtenerReview);
router.post('/', agregarReview);

module.exports = router;