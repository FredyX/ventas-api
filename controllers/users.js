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

const forgotPassword = async (req, res) => {
    const { user_email: email } = req.body;
    console.log(email);
    if (!(email)) {
        return res.status(400).json({ mensaje: 'Se necesita el correo' });
    }
    let message = 'Revisa tu correo electrónico te enviamos un link para restablecer tu contraseña';
    let emailStatus = 'OK';
    try {
        const user = await Users.findOne({ where: { user_email: email } });
        const token = jwt.sign({ id: user.id, user_email: user.user_email }, secret);
        let verificationLink = `http://192.168.0.6:3001/api/new_password?token=${token}&user_email=${user.user_email}`;
        // user.update({tokenRefresh: token}, {
        //     where: {
        //         user_email: email    
        //     }
        // });
        enviarEMail(generarEmail(user.user_email, verificationLink, 'Recuperación de cuenta'));
        //user.resetToken = token;
        //agregar ala base de datos

    } catch (err) {
        return res.json({ mensaje: 'No se encontro ese correo en la base de datos' });
    }

    res.json({ message, info: emailStatus });
}

const newPassword = async (req, res) => {
    const { token, user_email: email } = req.query;
    console.log(token);
    console.log(email);
    try {
        let jwtPayload = jwt.verify(token, 'clave secreta');
        res.writeHead(302, {
            Location: 'http://192.168.0.6:8081/inisiosesion/recuperacioncuenta/cambiocontrasena'
        });
        res.end();
    } catch (error) {
        res.json({ mensaje: 'Correo no encontrado', error });
    }
    //res.json({mensaje:token});
    //'http://front-end.com:8888/some/path'    

}

const resetPassword = async (req, res) => {
    const { new_password } = req.body;
    if (!newPassword) {
        return res.status(400).json({ mensaje: 'Necesita enviar la contraseña y enviarla en formato correcto' });
    }

    try {
        const user = await Users.findOne({ where: { resetToken } });
        user.update({ tokenRefresh: token }, {
            where: {
                user_email: email
            }
        });
    } catch (error) {
        res.json({ mensaje: 'Error al actualizar la contraseña' });
    }
}

const forgot_Password = async (req, res) => {
    const { user_email: email } = req.body;
    console.log(email);
    try {
        const user = await Users.findOne({ where: { user_email: email } });
        if (!user) {
            return res.status(400).json({ error: 'El correo no existe' });
        }
        let url = `http://192.168.0.6:8081/inisiosesion/recuperacioncuenta/cambiocontrasena/`
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '3h' });

        let verificationLink = `${url}?token=${token}&user_email=${user.user_email}`;
        
        enviarEMail(generarEmail(user.user_email, verificationLink, 'Recuperación de cuenta'));
        res.json({ mensaje: 'exito' });
    } catch (error) {
        res.json({ error: 'fallo' });
    }

    /*
    await Users.update({tokenRefresh: token}, {
            where: {
                user_email: email    
            }
        });*/
}

const reset_Password = async (req, res) => {
    const { user_password } = req.body;
    try {
        if (!req.user) {
            return res.status(500).json({
                msg: 'No existe el usuario'
            });
        }
        let password = bcrypt.hashSync(user_password, 10);
        const { id } = req.user;
        await Users.update({ user_password: password }, { where: { id } });
        res.json({ mensaje: 'Contraseña actualizada' });
    } catch (error) {
        res.json({ error: 'fallo' });
    }
}


module.exports = {
    userGetId,
    newPassword,
    forgot_Password,
    reset_Password
}