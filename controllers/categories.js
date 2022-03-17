const { Categories } = require('../config/db.config');

const getAllCategories = async (request, response) => {
    try {
        
        const category = await Categories.findAll();
        response.json(category);
    } catch (error) {
        response.json({error: `Error en categorías ${error}`});
    }
}

module.exports = {
    getAllCategories
}