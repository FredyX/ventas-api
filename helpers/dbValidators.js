const { Users, Departments } = require('../config/db.config');

const doUserEmailExist = async( user_email = '' ) => {
    const emailExist = await Users.findOne({ where: { user_email: user_email }});
    if ( emailExist ) {
        throw new Error(`El email: ${ user_email }, ya está registrado`);
    }
}

const doUserIdExist = async( user_id ) => {
    const user = await Users.findOne({ where: { id: user_id }});
    if ( !user ) {
        throw new Error(`El usuario con id ${ user_id } no existe `);
    }
}

const doDepartmentIdExist = async( department_id ) => {
    const department = await Departments.findOne({ where: { id: department_id }});
    if ( !department ) {
        throw new Error(`El departamento con id ${ department_id } no existe `);
    }
}


module.exports = {
    doUserEmailExist,
    doUserIdExist,
    doDepartmentIdExist
}
