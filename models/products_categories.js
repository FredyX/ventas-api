module.exports = (sequelize, type) => {
    return sequelize.define('products_categories', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            primaryKey: true
        },
        categorie_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            primaryKey: true
        }
    }, {
        timestamps: false
    });
}