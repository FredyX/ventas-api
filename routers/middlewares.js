const jwt = require('jwt-simple');
const moment = require('moment');
const checkToken = (req, res, next) => {
    if(!req.headers['user_token']){
        return res.json({error: 'Se necesita agregar el user_token en headers'})
    }
    const user_token = req.headers['user_token'];    
    let payload = {};
    try{
        payload = jwt.decode(user_token,'key word secret');
    }catch(err){
        return res.json({error: 'El tokent es incorrecto'});
    }
    if(payload.expiredAt < moment().unix()){
        return res.json({error: 'El token a expirado'});
    }
    //req.id = payload.id;
    next();
}

module.exports = {
    checkToken
}