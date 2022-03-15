const { Users } = require('../config/db.config');


const doUserEmailExist = async( user_email = '' ) => {

    // Verificar si el email existe
    const emailExist = await Users.findOne({ where: { user_email: user_email }});
    if ( emailExist ) {
        throw new Error(`El email: ${ user_email }, ya está registrado`);
    }
}

const doUserIdExist = async( user_id ) => {
    // Verificar si el correo existe
    const user = await Users.findOne({ where: { id: user_id }});
    if ( !user ) {
        throw new Error(`El usuario con id ${ user_id } no existe `);
    }
}



module.exports = {
    doUserEmailExist,
    doUserIdExist
}
