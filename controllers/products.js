const productsGetAll = () => { }
const productsGetCategorie = () => {}
const productsPutUpdate = () => {}
const productsDelete = () => {}

const { response, request } = require('express');

const { Products, Images, Categories, Products_Categories, sequelize } = require('../config/db.config');
const fs = require('fs');

const obtenerCategorias = async (id) => {
    let categorias = await Products_Categories.findAll({
        where: {
            product_id: id
        }
    });
    categorias = categorias.map(categorias => categorias.categorie_id);

    return categorias;
}

const obtenerImagenes = async (id) => {
    let imagenes = await Images.findAll({
        where: {
            product_id: id
        }
    });

    if (imagenes) {
        imagenes = imagenes.map(imagenes => imagenes.id);
    } else {
        imagenes = [];
    }
    return imagenes;
}

const productsGetId = async (req, res = response) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({
            where: {
                id: id
            }
        });
        if (!product) return res.status(404).json({
            message: 'Producto no Encontrado'
        });

        const imagenes = await obtenerImagenes(id);
        const categorias = await obtenerCategorias(id);

        productoRespuesta = {
            product,
            imagenes,
            categorias
        }

        res.json({
            productoRespuesta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            error
        });
    }
}

const productsGetUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const products = await Products.findAll({
            where: {
                user_seller_id: id
            }
        });
        if (!products) return res.status(404).json({
            message: 'Producto no Encontrado'
        });

        for (let i = 0; i < products.length; i++) {
            let categories = await obtenerCategorias(products[i].id);
            let images = await obtenerImagenes(products[i].id);
            products[i] = {
                ...products[i].dataValues,
                images,
                categories
            }
        }
        res.json({
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            error
        });
    }
}

const productsPostAdd = async (req, res = response) => {
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

        const product = await Products.create(newProduct, { transaction: t });

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
                    }, { transaction: t });
                }
            }
        }

        if (Images) {
            const img = fs.readFileSync(req.file.path);
            const encode_image = img.toString('base64');
            const finalImg = {
                image_data: new Buffer.from(encode_image),
                image_type: req.file.mimetype,
                image_name: req.file.filename,
                product_id: product.id
            };
            await Images.create(finalImg, { transaction: t });
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