module.export = (sequelize, type) => {
    return sequelize.define('images',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image_type: {
            type: type.STRING(10),
            allowNull: false
        },
        image_name: {
            type: type.STRING(100),
            allowNull: false,
        },
        image_data: {
            type: type.BLOB('medium'),
            allowNull: false
        },
        product_id: {
            type: type.INTEGER,
            allowNulll: false,            
        },
        

    },
    {
        timestamps: false
    }
    );
}