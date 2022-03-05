module.exports = (sequelize, type) => {
    return sequelize.define('users',{
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING(20),
            allowNull:false
        },
        last_name : {
            type: type.STRING(20),
            allowNull:false
        },
        profile_pic : {
            type: type.STRING(100),
            allowNull:false
        },
        user_email : {
            type: type.STRING(50),
            allowNull:false
        },
        user_password : {
            type: type.STRING(50),
            allowNull:false
        },
        is_company : {
            type: type.BOOLEAN,
            allowNull:false
        },
        is_admin : {
            type: type.BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
        score : {
            type: type.INTEGER,
            defaultValue: 0
        },
        department_id : {
            type: type.INTEGER,
            allowNull:false,
        }
    });
}