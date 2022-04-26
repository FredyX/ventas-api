const router = require('express').Router();
const { categoriasMasVendidas, categoriasMasSuscritas,departamentosMasProductos } = require('../../controllers/reporters');

router.get('/categorias/:limite', categoriasMasVendidas);
router.get('/suscripciones/:limite', categoriasMasSuscritas);
router.get('/departamentos/:id', departamentosMasProductos);
module.exports = router;