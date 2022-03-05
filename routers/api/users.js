const router = require('express').Router();
const { Users } = require('../../config/db.config');

//OBTENER TODOS LOS USUARIOS
router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
});

//OBTENER USUARIO POR ID
router.get('/:id', async (req, res) => {
    const user = await Users.findOne({
        where: { id: req.params.id }
    });
    res.json(user);
}
);

//OBTENER USUARIO POR NOMBRE
router.get('/:firt_name', async (req, res) => {
    const user = await Users.findOne({
        where: { id: req.params.firt_name }
    });
    res.json(user);
}
);

router.post('/', async (req, res) => {
    const users = await Users.create(req.body);
    res.json(users);
});

router.put('/:userId', async (req, res) => {
    await Users.update(req.body, {
        where: { id: req.params.userId }
    });

    res.json({ success: 'Modificado correctamente' });
});

router.delete('/:userId', async (req, res) => {
    await Users.destroy({
        where: { id: req.params.userId }
    });

    res.json({ success: 'Eliminado usuario correctamente' });
});
module.exports = router;