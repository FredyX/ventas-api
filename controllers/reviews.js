
const {sequelize} = require('../config/db.config');

const agregarReview = async (request, response) =>{

	  const {	  
	   review_value,
	   reviewed_user_id,
	   reviewer_user_id,	   
	}= request.body;

	const consulta = `
		INSERT INTO REVIEWS(review_value,reviewed_user_id, reviewer_user_id, review_date)
		VALUES(${review_value},${reviewed_user_id}, ${reviewer_user_id}, SYSDATE());
		`;
	try{
		const datos = await sequelize.query(consulta);
		response.json(datos);
	}catch(err){
		response.json({error: `No se logro insertar: ${err}`});
	}
	
}

const obtenerReview = async(request, response) => {
	const consulta = `SELECT * FROM REVIEWS;`;
	try{
		const datos = await sequelize.query(consulta);
		response.json(datos[0]);
	}catch(err){
		response.json({error: `Error al obtener calificaciones ${err}`});
	}
}

module.exports = {
	agregarReview,
	obtenerReview
}