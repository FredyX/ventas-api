const router = require('express').Router();
const { Users } = require('../../config/db.config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { generarEmail, enviarEMail, generarContenidoRegistro } = require('../../helpers/email');
const {doUserIdExist, doUserEmailExist,validateSameUser} = require('../../helpers/dbValidators');
const {validateFields,validateJwt,validateAdmin} = require('../../middlewares/');
const {userGetId, userGetProfileMod,forgot_Password, reset_Password, deleteUser} = require('../../controllers/users');


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
router.get('/:id',[
    validateJwt,
    validateAdmin,
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doUserIdExist),
    validateFields
],userGetId);

//OBTENER USUARIO Para modificar su perfil 
router.get('/personal/:id',[
    validateJwt,
    check('id').not().isEmpty().withMessage('El id es obligatorio'),
    check('id').custom(doUserIdExist),
    validateSameUser,
    validateFields
],userGetProfileMod);


//OBTENER USUARIO POR ID CON LOS DATOS PARA EL PERFIL
router.get('/profile/:id', async (req, res) => {
    try{
        const user = await Users.findOne({
            where: { id: req.params.id },
        });
        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            score: user.score,
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
    check('user_email').custom(doUserEmailExist),
    check('user_password', 'El password es incorrecto').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    req.body.user_password = bcrypt.hashSync(req.body.user_password, 10);
    try {
        const user = await Users.create(req.body);
        console.log(user.id);
        enviarEMail(generarEmail(user.user_email, generarContenidoRegistro(user.first_name, user.last_name), 'Bienvenido a ventasHN'));
        res.json(user);
    } catch (error) {
        console.log('error al guardar')
        res.json({ error: `No se logro crear ${error}` });
    }
});


router.put('/update/:userId', async (req, res) => {
    try {
        await Users.update(req.body, {
            where: { id: req.params.userId }
        });
    
        res.json({ success: 'Modificado correctamente' });
    } catch (error) {
        res.json({ error: `No se logro modificar ${error}` });
    }
});

router.delete('/:userId',deleteUser);

/*
async (req, res) => {
    await Users.destroy({
        where: { id: req.params.userId }
    });
    res.json({ success: 'Eliminado usuario correctamente' });
}
*/

//router.post('/forgot_password',forgotPassword);
//router.get('/new_password', newPassword);
//otro intento
router.put('/forgot_password/',forgot_Password);

router.put('/reset_Password',[
    validateJwt,
    check('user_password').not().isEmpty().withMessage('El password es obligatorio')
],reset_Password)
module.exports = router;