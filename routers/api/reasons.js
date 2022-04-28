const {agregarReasons, eliminarReasons, obtenerReasons, obtenerTodoReasons} = require('../../controllers/reasons');
const router = require('express').Router();

router.get('/', obtenerTodoReasons);
router.get('/:id', obtenerReasons);
router.post('/',agregarReasons);
router.delete('/:id', eliminarReasons);

module.exports  = router;