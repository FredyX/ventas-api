const { Departments } = require('../config/db.config');

const getAllDepartments = async (request, response) => {
    try {
        
        const category = await Departments.findAll();
        response.json(category);
    } catch (error) {
        response.json({error: `Error en departamentos ${error}`});
    }
}

const getDepartmentsId = async (request, response) => {
    try {
        const department = await Departments.findOne({
            where: { id: request.params.id }
        });
        response.json(department);
    } catch (error) {
        response.json({error: `Error en departamento ${error}`});
    }
}

module.exports = {
    getAllDepartments
    , getDepartmentsId
}