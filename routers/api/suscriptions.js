const router = require('express').Router();
const {
		agregarSuscripcion, getSuscriptionsId,
		actualizarSuscription, eliminarSuscripcion
	} = require('../../controllers/subcriptions');

router.post('/suscriptions/',agregarSuscripcion);
router.get('/suscriptions/:id',getSuscriptionsId);
router.put('/suscriptions/',actualizarSuscription);
router.delete('/suscriptions/:id',eliminarSuscripcion);
module.exports = router;

    
    