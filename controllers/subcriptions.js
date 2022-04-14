const {Suscriptions, Suscriptions_categories, Categories} = require('../config/db.config');

const getSuscriptionsId = async (request, response) => {    
    
    const idCategories = [];
    let nameCategories = [];    

    try {
        const { id } = request.params;
        const suscription = await Suscriptions.findOne({
            where: { user_id: id }
        });
        const categories = await Suscriptions_categories.findAll({
            where: {suscription_id: suscription.id}
        });

        categories.map( (item) => {
            const {categorie_id} = item.dataValues;            
            idCategories.push(categorie_id);
        });        
        const nameCateg = await Categories.findAll({
            where: {
                id:idCategories
            }
        });        
        nameCateg.map( ({dataValues}) => {                        
             nameCategories.push(dataValues.categorie_name);                                   
        });        
        let {dataValues} = suscription;
        dataValues.categorie_id = idCategories;
        dataValues.categorie_name = nameCategories;        
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
