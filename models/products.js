module.export = (sequelize, type) => {
    return sequelize.define('products', {
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,            
        },
        product_name:{
            type: type.STRING(100),
            allowNull:false
        },
        product_description:{
            type: type.STRING(500),
            allowNull: false
        },
        price: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        state:{
            type: type.STRING(1),
            allowNull: false
        },
        is_selling: {
            type : type.BOOLEAN,
            allowNull: false
        },
        date_added:{
            type: type.DATE,
            allowNull: false
        },
        department_id:{
            type: type.INTEGER,
            allowNull: false
        },
        user_seller_id: {
            type: type.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
}