const Sequelize = require('sequelize');

const dbConfig = {
    host: 'ventas-unah.mysql.database.azure.com',
    dialect: 'mysql',
    username: 'adming4@ventas-unah',
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
const Profile_picturesModel = require('../models/profile_pictures');
const ProductsModel = require('../models/products');
const ImagesModel = require('../models/images');

const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,{
    host: dbConfig.host,
    dialect:dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Users = UsersModel(sequelize, Sequelize);
const Profile_pictures = Profile_picturesModel(sequelize, Sequelize);
const Images = ImagesModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);

sequelize.sync({force: false})
    .then(()=> {
        console.log('Tablas sicronizadas');
    })
    .catch((err) => {
        console.log('Error:',err);
    });

module.exports = {
    Users,
    Profile_pictures,
    Products,
    Images
}
