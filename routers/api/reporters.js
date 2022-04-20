const router = require('express').Router();
const { categoriasMasVendidas, categoriasMasSuscritas,departamentosMasProductos } = require('../../controllers/reporters');

router.get('/categorias', categoriasMasVendidas);
router.get('/suscripciones', categoriasMasSuscritas);
router.get('/departamentos', departamentosMasProductos);
module.exports = router;