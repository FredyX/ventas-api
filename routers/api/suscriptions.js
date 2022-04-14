const router = require('express').Router();
const {agregarSuscripcion,getSuscriptionsId} = require('../../controllers/subcriptions');

router.post('/suscriptions/',agregarSuscripcion);
router.get('/suscriptions/:id',getSuscriptionsId);

module.exports = router;
