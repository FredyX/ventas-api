const {agregarReasons, eliminarReasons, obtenerReasons} = require('../../controllers/reasons');
const router = require('express').Router();

router.get('/:id', obtenerReasons);
router.post('/',agregarReasons);
router.delete('/:id', eliminarReasons);

module.exports  = router;