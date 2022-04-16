const router  = require('express').Router();
const { 
    agregarComplaints,
    eliminarComplaints,
    obtenerComplaints
    } = require('../../controllers/complaints');

router.get('/:id', obtenerComplaints);
router.post('/',agregarComplaints);
router.delete('/:id', eliminarComplaints);


module.exports = router;