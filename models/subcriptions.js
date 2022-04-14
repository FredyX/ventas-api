
module.exports = (sequelize, type) => {
    return sequelize.define('suscriptions',{
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER,
            allowNull:false
        },        
        department_id: {
            type: type.INTEGER,
            allowNull: false
        },
        order_prior: {
            type: type.STRING,
            allowNull:false
        },
        min_seller_score: {
            type: type.INTEGER
        },
        preferred_day: {
            type: type.STRING,
            allowNull: false
        }
    },

    {
        timestamps: false
    });
}
