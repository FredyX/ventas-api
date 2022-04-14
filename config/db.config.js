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
const SuscriptionsModel = require('../models/subcriptions');
const Suscriptions_categoriesModel = require('../models/suscriptions_categories');
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
const Suscriptions = SuscriptionsModel(sequelize,Sequelize);
const Suscriptions_categories = Suscriptions_categoriesModel(sequelize, Sequelize);
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
    Departments,
    Suscriptions,
    Suscriptions_categories
}
