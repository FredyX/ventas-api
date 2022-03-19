const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { Users } = require('../config/db.config');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { user_email, user_password } = req.body;
    try {
        // Verificar si el email existe
        const user = await Users.findOne({ where: { user_email: user_email } });
        if ( !user ) {
            return res.status(400).json({
                msg: 'user no encontrado'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( user_password, user.user_password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Password no correcto'
            });
        }
        // Generar el JWT
        const token = await generarJWT( user.id );
        res.json({data:{
            user : {
                user_id: user.id,
                is_admin: user.is_admin
            },
            token}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   
}

module.exports = {
    login
}
