const productsGetAll = ()=>{}
const productsGetId = ()=>{}
const productsGetCategorie = ()=>{}
const productsGetUser = ()=>{}
const productsPutUpdate = ()=>{}
const productsDelete = ()=>{}

const { response, request } = require('express');

const {Products, Images, Categories} = require('../config/db.config');

const productsPostAdd = async(req, res = response) => {
    try {
        const {
            product_name,
            product_description,
            price,
            department_id,
            state,
            categories,
            user_seller_id
        } = req.body;

        res.json({
            message: 'Producto agregado correctamente',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            error
        });
    }
}
module.exports = {
    productsGetAll,
    productsGetId,
    productsGetCategorie,
    productsGetUser,
    productsPostAdd,
    productsPutUpdate,
    productsDelete
}