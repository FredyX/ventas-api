const { Users, Departments, Products , Categories } = require('../config/db.config');

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
const doCategoryIdExist = async( categorie_id ) => {
    const category = await Categories.findOne({ where: { id: categorie_id }});
    if ( !category ) {
        throw new Error(`La categoría con id ${ categorie_id } no existe `);
    }
}

const doProductIdExist = async( product_id ) => {
    const product = await Products.findOne({ where: { id: product_id }});
    if ( !product ) {
        throw new Error(`El producto con id ${ product_id } no existe `);
    }
}



module.exports = {
    doUserEmailExist,
    doUserIdExist,
    doDepartmentIdExist,
    doCategoryIdExist,
    doProductIdExist
}
