const router = require('express').Router();
const { Users } = require('../../config/db.config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const { generarEmail, enviarEMail, generarContenidoRegistro , generarContenidoLoggin } = require('../../helpers/email');

//OBTENER TODOS LOS USUARIOS
router.get('/', async (req, res) => {
    try{
        const users = await Users.findAll();
        res.json(users);
    }catch(err){
        res.json({error:`Error al intertar obtener los usuarios ${err}` });
    }
    
});

//OBTENER USUARIO POR ID
router.get('/:id', async (req, res) => {
    try{
        const user = await Users.findOne({
            where: { id: req.params.id }
        });
        res.json(user);
    }catch(err){
        res.json({error:`Error usuario buscado por id no encontrado ${err}` });
    }       
}
);

//OBTENER USUARIO POR ID CON LOS DATOS PARA EL PERFIL
router.get('/profile/:id', async (req, res) => {
    try{
        const user = await Users.findOne({
            where: { id: req.params.id },
        });
        /*
        let products = await Products.findAll({
            where: { user_id: user.id }
        });
        products = products.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price
            } 
        } );*/
        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            score: user.score,
            profile_picture_id: user.profile_picture_id,
            //products
        };
        res.json(data);
    }catch(err){
        res.json({error:`Error al obtener los datos del perfil ${err}` });
    }    
}
);

//OBTENER USUARIO POR NOMBRE
router.get('/:firt_name', async (req, res) => {
    try{
        const user = await Users.findOne({
            where: { id: req.params.firt_name }
        });
        res.json(user);
    }catch(err){
        res.json({error:`Error nombre no encontrado ${err}` });
    }    
}
);
//REGISTRA EL USUARIO EN LA BASE DE DATOS
router.post('/register', [
    check('user_email', 'El correo es obligatorio').not().isEmpty(),
    check('user_password', 'El password es incorrecto').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() });
    }
    req.body.user_password = bcrypt.hashSync(req.body.user_password, 10);
    try {
        const user = await Users.create(req.body);
        enviarEMail(generarEmail(user.user_email, generarContenidoRegistro(user.first_name, user.last_name), 'Bienvenido a ventasHN'));
        res.json(user);
    } catch (error) {
        console.log('error al guardar')
        res.json({ error: `No se logro crear ${error}` });
    }
});

router.post('/login', async (req, res) => {
    const user = await Users.findOne({ where: { user_email: req.body.user_email } });
    if (user) {
        const match = bcrypt.compareSync(req.body.user_password, user.user_password);
        if (match) {
            enviarEMail(generarEmail(req.body.user_email, generarContenidoLoggin(user.first_name), 'Nuevo inicio de sesion registrado'));
            res.json({ success: createToken(user) });
        } else {
            res.json({ error: 'Error en usuario o contraseña' });
        }
    } else {
        res.json({ error: 'Error en usuario o contraseña' });
    }
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

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix(),
    }

    return jwt.encode(payload, 'key word secret');
}
module.exports = router;