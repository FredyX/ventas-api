const router = require('express').Router();
const { categoriasMasVendidas } = require('../../controllers/reporters');

router.get('/categorias', categoriasMasVendidas);

module.exports = router;