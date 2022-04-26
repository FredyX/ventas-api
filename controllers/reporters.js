const {Categories, sequelize} = require('../config/db.config');

const categoriasMasVendidas = async(request, response) =>{
	const {limite} = request.params;
	const queryCategoriasPopulares = `
		select c.CATEGORIE_NAME as nombre, count(distinct  p.ID) as cantidad from products p 
		join products_categories pc on p.ID = pc.PRODUCT_ID 
		join categories c on pc.CATEGORIE_ID = c.ID
		group by c.CATEGORIE_NAME order by cantidad desc limit ${limite};
	`;

	try{
		const datos = await sequelize.query(queryCategoriasPopulares);

		response.json(datos[0]);
	}catch(err){
		response.json({error:`Error al obtener el reporte ${err}`});
	}
}

const categoriasMasSuscritas = async(request, response) => {
	const {limite} = request.params;
	const queryMasSuscripciones = `select c.CATEGORIE_NAME as nombre,count(distinct s.ID) as cantidad from suscriptions s
		join suscriptions_categories sc on sc.SUSCRIPTION_ID = s.ID 
		join categories c on c.ID = sc.CATEGORIE_ID 
		group by c.CATEGORIE_NAME order by cantidad desc limit ${limite};`;
		try{
			const datos = await sequelize.query(queryMasSuscripciones);
			response.json(datos[0]);
		}catch(err){
			response.json({error:`erro al obtener el reporte ${err}`});
		}
	}
const departamentosMasProductos = 	async(request, response) => {
	const {id} = request.params;
	const queryMasDepartamento = `select d.DEPARTMENT_NAME as nombre,count(distinct p.ID) as cantidad from products p
		join departments d on d.ID = p.DEPARTMENT_ID
		join products_categories pc on pc.PRODUCT_ID = p.ID
		join  categories c on pc.CATEGORIE_ID = c.ID
		where c.ID = ${id}
		group by d.DEPARTMENT_NAME order by cantidad desc;`;

	try{
		const datos = await sequelize.query(queryMasDepartamento);
		response.json(datos[0]);
	}catch(err)	{
		response.json({error:`erro al obtener el reporte ${err}`});
	}
}


module.exports = {
	categoriasMasVendidas,
	categoriasMasSuscritas,
	departamentosMasProductos	
}