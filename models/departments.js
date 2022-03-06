module.exports = (sequelize, type) => {
    return sequelize.define('departments',{
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        department_name: {
            type: type.STRING(17),
            allowNull:false
        }
    },
    {
        timestamps: false
    });
}

