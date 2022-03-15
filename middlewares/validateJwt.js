const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { Users } = require('../config/db.config');
const { secret } = require('../config/auth.config');

const validateJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { id } = jwt.verify(token, secret);
        // leer el usuario que corresponde al uid
        const user = await Users.findOne({ where: { id: id } });
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - user no existe DB'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJwt
}