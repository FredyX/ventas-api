const {Suscriptions, Suscriptions_categories} = require('../config/db.config');

const getSuscriptionsId = async (request, response) => {
    try {
        const suscription = await suscription.findOne({
            where: { id: request.params.id }
        });
        response.json(suscription);
    } catch (error) {
        response.json({error: `Error en suscripciones ${error}`});
    }
}

const agregarSuscripcion = async (request, response) => {
    try{
        const {
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day,            
        } = request.body;
        const suscripcion = {
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day
        }        
        const {id} = await Suscriptions.create(suscripcion);                
        response.json({id});
    }catch(err){
        response.json({error: ` El error es ${err}`});
    }
}

const agregarSusCategories = async(request, response) => {
    const {suscription_id,categorie_id} = request.body;    
    try{        
        categorie_id.map( async(id) => {
            await Suscriptions_categories.create({suscription_id, categorie_id:id});
        });
        response.json({status:"Ok"});    
    }catch(err){
        response.json({error:`no se agregaron ${err}`});
    }    
}
module.exports = {
    agregarSuscripcion,
    getSuscriptionsId,
    agregarSusCategories
}
