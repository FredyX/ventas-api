const jwt = require('jsonwebtoken');

const {secret} = require('../config/auth.config');

const generarJWT = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, secret, {
            expiresIn: '48h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}

