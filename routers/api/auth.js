const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../../middlewares/validateFields');

const { login } = require('../../controllers/auth');

const router = Router();

router.post('/login',[
    check('user_email', 'El correo es obligatorio').isEmail(),
    check('user_password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login );

module.exports = router;