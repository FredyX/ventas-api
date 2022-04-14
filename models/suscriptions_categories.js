
module.exports = (sequelize, type) => {
    return sequelize.define('suscriptions_categories',{
        suscription_id:{
            type: type.INTEGER,
            primaryKey:true
        },
        categorie_id: {
            type: type.INTEGER,
            allowNull:false
        }    
    },

    {
        timestamps: false
    });
}
