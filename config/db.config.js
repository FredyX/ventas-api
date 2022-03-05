const Sequelize = require('sequelize');
/*
const sequelize = new  Sequelize('adming4@ventas-unah','ventashn','grupo4unah@',{
    host: 'ventas-unah.mysql.database.azure.com',
    dialect: 'mysql'
});

*/

const UsersModel = require('../models/users');

const sequelize = new Sequelize('prueba','admin','admin',{
    host: 'localhost',
    port: '3306',
    dialect:'mysql'
});

const Users = UsersModel(sequelize, Sequelize);
sequelize.sync({force: false})
    .then(()=> {
        console.log('Tablas sicronizadas');
    })
    .catch(() => {
        console.log('Error');
    });
  

module.exports = {
    Users
}