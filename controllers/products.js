const multer = require('multer');
const path = require('path');
const { compararNombreImagenes } = require('../helpers/compararNombreImagenes');
const fs = require('fs');

const disktorage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, req.body.user_seller_id + '-' + req.body.product_name+"."+req.body.ext );
    },
});

const fileUpload = multer({
    storage: disktorage
    , limits: { fieldSize: 25 * 1024 * 1024 }
}).single('file');

const productsGetCategorie = () => { }
const productsGetAll = async (req, res) => {

}
const productsPutUpdate = () => { }
const productsDelete = () => { }

const { response, request } = require('express');

const { Products, Images, Categories, Products_Categories, sequelize } = require('../config/db.config');


const obtenerCategorias = async (id) => {
    let categorias = await Products_Categories.findAll({
        where: {
            product_id: id
        }
    });
    categorias = categorias.map(categorias => categorias.categorie_id);
    return categorias;
}

const obtenerImagenes = async (req, res) => {
    try {
        let imagenes = await Images.findAll({
            //  atributes:['image_data'],
            where: {
                product_id: req.params.id
            }
        });
        imagenes.map((imagen) => {
            fs.writeFileSync(path.join(__dirname,
                '../public/dbimages/' + imagen.image_name), imagen.image_data);
        });
        const imagesdir = fs.readdirSync(
            path.join(__dirname, '../public/dbimages/'));
        res.json(compararNombreImagenes(imagesdir, imagenes));
    } catch (error) {
        res.json({ error: `No se encontraron imagenes del producto ${error}` });
    }
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

        //  const imagenes = await obtenerImagenes(id);
        const categorias = await obtenerCategorias(id);

        productoRespuesta = {
            product,
            //    imagenes,
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
            date_added,
            ext
        } = req.body;

        const newProduct = {
            product_name,
            product_description,
            price,
            department_id,
            state,
            user_seller_id,
            date_added,
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
        if (ext) {
            image_type = 'image/'+ext;
        }
        const img = fs.readFileSync(
            path.join(__dirname, '../public/images/'+ user_seller_id+'-'+product_name+"."+ext));
        const finalImg = {
            image_data: img,
            image_type: image_type,
            image_name: +user_seller_id+'-'+product_name+"."+ext,
            product_id: product.id
        };
        await Images.create(finalImg, { transaction: t });

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
    productsDelete,
    fileUpload,
    obtenerImagenes
}