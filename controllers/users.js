const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const { Users } = require('../config/db.config');


const userGetId = async(req, res = response) => {
    const { id } = req.params;
    const user = await Users.findOne({where: { id: id}});
    
    res.json(user);
}

const userGetProfileMod = async(req, res = response) => {
    const { id } = req.params;
    try{
    const user = await Users.findByPk(id);
    const data = {
        first_name: user.first_name,
        last_name: user.last_name,
        score: user.score,
        profile_picture_id: user.profile_picture_id,
        user_email : user.user_email,
        department_id : user.department_id,
        is_company : user.is_company,
    };
    res.json(data);
}catch(err){
    res.json({error:`Error al obtener los datos del perfil ${err}` });
    }
}

module.exports = {
    userGetId,
    userGetProfileMod
}