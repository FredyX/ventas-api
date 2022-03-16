module.exports = (sequelize, type) => {
    return sequelize.define('categorie_name',{
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        categorie_name: {
            type: type.STRING(50),
            allowNull:false
        },        
    },
    {
        timestamps: false
    });
}