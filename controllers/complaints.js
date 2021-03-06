const { Complaints, Reasons} = require('../config/db.config');

const obtenerComplaints = async (request, response) =>{
    try{
        const {id} = request.params;
        const denuncia = await Complaints.findAll();
        response.json(denuncia);
    }catch(err){
        response.json({error:`Error al buscar la denuncia ${err}`})
    }            
}

const agregarComplaints = async (request, response) =>{
    console.log(request.body);
        
    try{
        const comp = await Complaints.create(request.body);        
        response.json(comp);
    } catch(err){
        response.json({error: `Error al crear la queja ${err}`});
    }
}
const eliminarComplaints = async (request, response) =>{
    const {id} = request.params;
    try{
        const queja = await Complaints.destroy({where:{
            id
        }});
        response.json(queja);
    }catch(err){
        response.json({error: `No de pudo eliminar la queja ${err}`});
    }
}

module.exports = {
    agregarComplaints,
    eliminarComplaints,
    obtenerComplaints    
}
