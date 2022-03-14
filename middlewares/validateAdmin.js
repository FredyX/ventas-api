const { response } = require('express')


const validateAdmin = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { is_admin, first_name } = req.user;
    
    if ( !is_admin) {
        return res.status(401).json({
            msg: `${ first_name } no es administrador - No puede hacer esto`
        });
    }

    next();
}



module.exports = {
    validateAdmin
}