const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const { generarEmail, enviarEMail } = require('../helpers/email');


const { Users } = require('../config/db.config');
//const { where } = require('sequelize/types');


const userGetId = async (req, res = response) => {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id: id } });

    res.json(user);
}

const forgot_Password = async (req, res) => {
    const { user_email: email } = req.body;
    console.log(email);
    try {
        const user = await Users.findOne({ where: { user_email: email } });
        if (!user) {
            return res.status(400).json({ error: 'El correo no existe' });
        }
        let url = `http://localhost:8081/iniciosesion/recuperacioncuenta/cambiocontrasena`
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '3h' });

        let verificationLink = `${url}?token=${token}&user_email=${user.user_email}`;
        
        enviarEMail(generarEmail(user.user_email, verificationLink, 'Recuperación de cuenta'));
        res.json({ mensaje: 'exito' });
    } catch (error) {
        res.json({ error: 'fallo' });
    }
    
}

const reset_Password = async (req, res) => {
    const { user_password, user_email } = req.body;
	console.log(user_password, user_email);
    try {
        if (!user_email) {
            return res.status(500).json({
                msg: 'No existe el usuario'
            });
        }
        let password = bcrypt.hashSync(user_password, 10);
        //const { id } = req.user;
		const us = await Users.update({ user_password: password }, { where: { user_email } });
		console.log(typeof us ,us);
        res.json({ mensaje: 'Contraseña actualizada' });
    } catch (error) {
        res.json({ error: 'fallo' });
    }
}


module.exports = {
    userGetId,    
    forgot_Password,
    reset_Password
}
