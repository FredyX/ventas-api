const Sequelize = require('sequelize');

const dbConfig = {
    host: 'swapperdev.mysql.database.azure.com',
    dialect: 'mysql',
    username: 'adming4@swapperdev',
    password: 'grupo4unah@',
    database: 'ventashn',
}

/*
const dbConfig = {
    host: 'localhost',
    dialect: 'mysql',
    username: 'admin',
    password: 'admin',
    database: 'prueba',
}
*/

const UsersModel = require('../models/users');
const DepartmentsModel = require('../models/departments');
const ImagesModel = require('../models/images');
const ProductsModel = require('../models/products');
const CategoriesModel = require('../models/categories');
const Products_CategoriesModel = require('../models/products_categories');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Users = UsersModel(sequelize, Sequelize);
const Departments = DepartmentsModel(sequelize, Sequelize);
const Images = ImagesModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);
const Categories = CategoriesModel(sequelize, Sequelize);
const Products_Categories = Products_CategoriesModel(sequelize, Sequelize);

console.log('Lo que tenemos es', Images);
console.log(typeof Images);
console.log(Images);
sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sicronizadas');
    })
    .catch((err) => {
        console.log('Error:', err);
    });

module.exports = {
    Users,
    Images,
    Products,
    sequelize,
    Categories,
    Products_Categories,
    Departments
}
