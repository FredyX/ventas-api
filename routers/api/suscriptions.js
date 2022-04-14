const router = require('express').Router();
const {agregarSuscripcion} = require('../../controllers/subcriptions');

router.post('/suscriptions/',agregarSuscripcion);


module.exports = router;
