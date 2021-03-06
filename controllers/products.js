const multer = require('multer');
const path = require('path');
const { compararNombreImagenes } = require('../helpers/compararNombreImagenes');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const { response, request } = require('express');

const { Products, Images, Categories, Products_Categories, sequelize, Users, Departments } = require('../config/db.config');
const moment = require('moment');

const disktorage = multer.diskStorage({ destination: path.join(__dirname, '../public/images'), filename: (req, file, cb) => { cb(null, parseInt(Date.parse(req.body.date_added) / 10000, 10) + "-" + req.body.user_seller_id + '-' + req.body.product_name + "." + req.body.ext); }, });

const fileUpload = multer({ storage: disktorage, limits: { fieldSize: 25 * 1024 * 1024 } }).single('file');


const productsPutUpdate = async (req, res = response) => {
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
            ext
        } = req.body;

        const updatedProduct = {
            product_name,
            product_description,
            price,
            department_id,
            state
        }
        const product = await Products.update(updatedProduct, {
            where: {
                id: req.params.id
            }
        }, { transaction: t });

        if (categories) {
            //eliminamos las categorias anteriores
            await Products_Categories.destroy({
                where: {
                    product_id: req.params.id
                }
            }, { transaction: t });
            //agregamos las nuevas categorias
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
            image_type = 'image/' + ext;
        }
        const img = fs.readFileSync(
            path.join(__dirname, '../public/images/' + user_seller_id + '-' + product_name + "." + ext));
        const finalImg = {
            image_data: img,
            image_type: image_type,
            image_name: user_seller_id + '-' + product_name + "." + ext,
            product_id: product.id
        };
        await Images.update(finalImg, { transaction: t });
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
const productsDelete = async (req, res = response) => {
    const t = await sequelize.transaction();
    try {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        }, { transaction: t });
        await t.commit();
        res.json({
            success: true,
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        await t.rollback();
        res.json({
            success: false,
            message: 'Error al eliminar el producto'
        });
    }
}

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

const productsGetIdDetalle = async (req, res = response) => {
    try {
        const idProducto = req.params.id;
        const producto = await sequelize.query(`SELECT products.id,product_name,product_description,price,state,is_selling,date_added,department_name, user_seller_id ,first_name,last_name,score FROM products join departments on products.department_id = departments.id join users on products.user_seller_id = users.id where products.id= ${idProducto}`, { type: QueryTypes.SELECT });
        const categorias = await sequelize.query(`
        select categories.id,categorie_name from categories inner join products_categories on categories.id = products_categories.categorie_id inner join products on products.id = products_categories.product_id where products.id = ${idProducto}`, { type: QueryTypes.SELECT });
        let imagenes = await Images.findAll({
            where: {
                product_id: idProducto
            }
        });
        imagenes.map((imagen) => {
            fs.writeFileSync(path.join(__dirname,
                '../public/dbimages/' + imagen.image_name), imagen.image_data);
        });
        const imagesdir = fs.readdirSync(
            path.join(__dirname, '../public/dbimages/'));
        let imagenesRes = compararNombreImagenes(imagesdir, imagenes);
        res.json({ producto, categorias, imagenesRes });
    } catch (error) {
        res.json({ error: `No se encontraron productos ${error}` });
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
        const products = await sequelize.query(`SELECT products.id,product_name,product_description,price,state,is_selling,date_added,department_name,first_name,last_name,score, image_name, image_data FROM products join departments on products.department_id = departments.id join users on products.user_seller_id = users.id join images on images.product_id=products.id where products.user_seller_id= ${id} order by date_added asc `, { type: QueryTypes.SELECT });
        if (!products) return res.status(404).json({
            message: 'El suario no tiene productos'
        });
        data = [];
        products.map(
            (product) => {
                const { id, product_name, product_description, price, state, is_selling, date_added, department_name, first_name, last_name, score, image_name, image_data } = product;

                fs.writeFileSync(path.join(__dirname,
                    '../public/dbimages/' + image_name), image_data);

                const p = {
                    id, product_name, product_description, price, state, is_selling, date_added, department_name, first_name, last_name, score, image_name
                }
                data.push(p);
            }
        )
        res.json({
            data
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

        let datefinal = new moment(Date.parse(date_added));

        const newProduct = {
            product_name,
            product_description,
            price,
            department_id,
            state,
            user_seller_id,
            date_added: datefinal
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
            image_type = 'image/' + ext;
        }
        const img = fs.readFileSync(
            path.join(__dirname, '../public/images/' + parseInt(Date.parse(date_added) / 10000, 10) + "-" + user_seller_id + '-' + product_name + "." + ext));
        const finalImg = {
            image_data: img,
            image_type: image_type,
            image_name: parseInt(Date.parse(date_added) / 10000, 10) + "-" + user_seller_id + '-' + product_name + "." + ext,
            product_id: product.id
        };
        await Images.create(finalImg, { transaction: t });

        fs.unlink(path.join(__dirname, '../public/images/' + parseInt(Date.parse(date_added) / 10000, 10) + "-" + user_seller_id + '-' + product_name + "." + ext), (err) => {
            if (err) throw err;
            console.log('successfully deleted');
        });

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

const productsSearch = async (req, res = response) => {
    try {
        const { search, categories, departments, score } = req.params;
        let cat = '';
        let dep = '';
        let srch = "'" + " " + "'";
        let scr = '';


        if (search != 'null') {
            console.log(search);
            srch = "'" + search + "'";
        }

        if (categories == 'null') {
            cat = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18';
        }
        else {
            cat = categories;
        }

        if (departments == 'null') {
            dep = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18';
        } else {
            dep = departments;
        }

        if (score == 'null') {
            scr = 0;
        } else {
            scr = score;
        }

        if (search == 'null' && categories == 'null' && departments == 'null' && score == 'null') {
            cat = '1,2,3,4,5,6,7,8,9,10';
            scr = 5;
        }

        const products = await sequelize.query(`SELECT DISTINCT products.id,product_name,product_description,price,state,is_selling,date_added,department_name,first_name,last_name,score, image_name,image_data FROM products join departments on products.department_id = departments.id join users on products.user_seller_id = users.id join images on images.product_id=products.id join products_categories on products.id = products_categories.product_id WHERE ((MATCH(product_name,product_description) AGAINST(${srch}) AND categorie_id in (${cat}) AND products.department_id in (${dep})) AND score >= ${scr}) ORDER BY MATCH(product_name,product_description) AGAINST(${srch}) DESC`, { type: QueryTypes.SELECT });

        if (!products) return res.status(404).json({
            message: 'No se encontraron productos'
        });

        let quantity = products.length;

        let data = [];

        products.map(
            (product) => {
                const { id, product_name, product_description, price, state, is_selling, date_added, department_name, first_name, last_name, score, image_name, image_data } = product;

                fs.writeFileSync(path.join(__dirname,
                    '../public/dbimages/' + image_name), image_data);

                const p = {
                    id, product_name, product_description, price, state, is_selling, date_added, department_name, first_name, last_name, score, image_name
                }
                data.push(p);
            }
        )
        res.json({
            data,
            totalPages: Math.ceil(quantity / 9)
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
    productsGetId,
    productsGetUser,
    productsPostAdd,
    productsPutUpdate,
    productsDelete,
    fileUpload,
    obtenerImagenes,
    productsGetIdDetalle,
    productsSearch
}