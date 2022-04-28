
const { Categories } = require('../config/db.config');


const getAllCategories = async (request, response) => {
    try {
        
        const category = await Categories.findAll();
        response.json(category);
    } catch (error) {
        response.json({error: `Error en categorías ${error}`});
    }
}

const getCategoriesId = async (request, response) => {
    try {
        const category = await Categories.findOne({
            where: { id: request.params.id }
        });
        response.json(category);
    } catch (error) {
        response.json({error: `Error en categorías ${error}`});
    }
}

const categoriesDelete = async (req, res = response) => {

    try {
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            success: true,
            message: 'Categoria eliminado correctamente'
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Error al eliminar la categoria'
        });
    }
}

const categoriesPutUpdate = async (req, res = response) => {
    try {

        const categories = await Categories.update(res.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            message: 'Categoria actualizada correctamente',
            categories
        }
        )
    }catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Hubo un error',
                error
            });
    }
}

const categoriesPostAdd = async (req, res = response) => {
    try {

        const cat = await Categories.create(req.body);
        res.json({
            message: 'Categoria agregada correctamente',
            cat
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error',
            error
        });
    }
}
    
module.exports = {
    getAllCategories,
    getCategoriesId,
    categoriesDelete,
    categoriesPutUpdate,
    categoriesPostAdd
}