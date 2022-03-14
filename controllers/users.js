const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const { Users } = require('../config/db.config');


const userGetId = async(req, res = response) => {
    const { id } = req.params;
    const user = await Users.findOne({where: { id: id}});
    
    res.json(user);
}


module.exports = {
    userGetId
}