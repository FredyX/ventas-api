const productsGetAll = ()=>{}
const productsGetId = ()=>{}
const productsGetCategorie = ()=>{}
const productsGetUser = ()=>{}
const productsPutUpdate = ()=>{}
const productsDelete = ()=>{}

const { response, request } = require('express');

const {Products, Images, Categories, Products_Categories, sequelize} = require('../config/db.config');


const productsPostAdd = async(req, res = response) => {
    const t = await sequelize.transaction();

    try {
        const {
            product_name,
            product_description,
            price,
            department_id,
            state,
            categories,
            user_seller_id,
        } = req.body;


        const newProduct = {
            product_name,
            product_description,
            price,
            department_id,
            state,
            user_seller_id,
            date_added: new Date(),
        }

        const product = await Products.create(newProduct, {transaction: t});

        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                const categorie = await Categories.findOne({
                    where: {
                        id: categories[i]
                    }
                });
                if (categorie) {               
                    await Products_Categories.create({
                    categorie_id: categories[i],
                    product_id: product.id
                }, {transaction: t});
                }
            }
        }

        await t.commit();

        res.json({
            message: 'Producto agregado correctamente',
            product
        });
    } catch (error) {
        console.log(error);
        await t.rollback();
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