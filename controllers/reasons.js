const {Reasons} = require('../config/db.config');

const agregarReasons = async (request, response) =>{
	const {
		reason_name,
		reason_description,
	} = request.body;
	const datos = {
		reason_name,
		reason_description,
	}
	try {
		console.log(datos);
		const reason = await Reasons.create(datos);
		response.json(reason);
	} catch(e) {		
		response.json({error: `No se logro crear la razon ${e}`});
	}
}

const eliminarReasons = async (request, response) =>{
	const {id} = request.params;

	try {
		const reason = await Reasons.destroy({ where:{id}})
		response.json(reason);
	} catch(e) {
		response.json({error: `Error al eliminar la razon ${e}`})
	}
}
const obtenerReasons = async (request, response) =>{
	const {id} = request.params;

	try{
		const reason = await Reasons.findAll({where:{id}});
		response.json(reason);
	}catch(err){
		response.json({error: `Error al obtener las razones`});
	}
}

const obtenerTodoReasons = async (request, response) =>{
	try{
		const reason = await Reasons.findAll();
		response.json(reason);
	}catch(err){
		response.json({error:`Error al querer obtener todos las razones ${err}`});
	}
}
module.exports = {
	agregarReasons,
	eliminarReasons,
	obtenerReasons,
	obtenerTodoReasons
}