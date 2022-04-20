const {Categories, sequelize} = require('../config/db.config');

const categoriasMasVendidas = async(request, response) =>{
	const queryCategoriasPopulares = `
		select c.CATEGORIE_NAME as nombre, count(distinct  p.ID) as cantidad from products p 
		join products_categories pc on p.ID = pc.PRODUCT_ID 
		join categories c on pc.CATEGORIE_ID = c.ID
		group by c.CATEGORIE_NAME;
	`;

	try{
		const datos = await sequelize.query(queryCategoriasPopulares);

		response.json(datos[0]);
	}catch(err){
		response.json({error:`Error al obtener el reporte ${err}`});
	}
}


module.exports = {
	categoriasMasVendidas	
}