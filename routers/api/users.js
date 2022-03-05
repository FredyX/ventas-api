const router = require('express').Router();
const {Users} = require('../../config/db.config');

//petición get para obtener usuarios
router.get('/', async(req, res) => {    
    const users = await Users.findAll();
    res.json(users);
});

//petición POST para crear usuarios
router.post('/',async(req, res) =>{
    const users = await Users.create(req.body);
    res.json(users);
});

router.put('/:userId', async(req, res) => {
    await Users.update(req.body, {
        where: {id: req.params.userId}
    });

    res.json({success: 'Modificado correctamente'});
});

router.delete('/:userId', async (req, res) => {
    await Users.destroy({
        where: {id: req.params.userId}
    });

    res.json({success: 'Eliminado usuario correctamente'});
});
module.exports = router;