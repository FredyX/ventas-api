const {Suscriptions, Suscriptions_categories, Categories, Departments} = require('../config/db.config');

const getSuscriptionsId = async (request, response) => {    
    
    const idCategories = [];
    let nameCategories = [];    

    try {
        const { id } = request.params;
        const suscription = await Suscriptions.findOne({
            where: { user_id: id }
        });
        if(suscription){            
            const categories = await Suscriptions_categories.findAll({
                where: {suscription_id: suscription.id}
            });
            if(categories){
                categories.map( (item) => {
                    const {categorie_id} = item.dataValues;            
                    idCategories.push(categorie_id);
                });
                const nameCateg = await Categories.findAll({
                    where: {
                        id:idCategories
                    }
                });
                if(nameCateg){
                    nameCateg.map( ({dataValues}) => {                        
                        nameCategories.push(dataValues.categorie_name);                                   
                   });
                   let {dataValues} = suscription;
                   const nameDepartament = await Departments.findOne({
                       where: {
                           id:dataValues.department_id
                       }
                   });                    
                   dataValues.categorie_id = idCategories;
                   dataValues.categorie_name = nameCategories;
                   dataValues.department_name = nameDepartament.department_name;        
                   response.json(suscription);
                }
            }else{
                response.json(suscription);
            }                        
        }else{            
            response.json(suscription);
        }
        
    } catch (error) {
        response.json({error: `Error en suscripciones ${error}`});
    }
}

const actualizarSuscription = async (request, response) => {
    try{
        
        const {
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day,
            id            
        } = request.body;

        const suscripcion = {
            user_id,
            department_id,
            order_prior,
            min_seller_score,
            preferred_day
        }
        console.log(suscripcion);                
        const {id:idS} = await Suscriptions.update(
                        suscripcion,{
                            where:{
                                id
                            }
                        });
        response.json({idS});
    }catch(err){
        response.json({erro: `Erro al actualizar ${err}`});
    }
}

const actualizarSusCategories = async(request, response) =>{
    const {suscription_id,categorie_id} = request.body;        
    try{        
        Suscriptions_categories.destroy({
            where:{
                suscription_id
            }
        });
        categorie_id.map( async(id) => {            
            await Suscriptions_categories.create(
                {suscription_id,categorie_id:id}
            );
        });
        response.json({status:"Ok"});    
    }catch(err){
        response.json({error:`no se agregaron ${err}`});
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
        console.log(categorie_id);
        categorie_id.map( async(id) => {
            await Suscriptions_categories.create({suscription_id, categorie_id:id});
        });
        response.json({status:"Ok"});    
    }catch(err){
        response.json({error:`no se agregaron ${err}`});
    }    
}

const eliminarSuscripcion = async (request, response) => {
    try{
        const {id} = request.params;        
        const suscription = await Suscriptions.destroy({where:{id}});
        response.json({status:"Ok"});
    }catch(err){
        response.json({error: `no se elimino ${err}`})
    }
    
}



module.exports = {
    agregarSuscripcion,
    getSuscriptionsId,
    agregarSusCategories,
    actualizarSuscription,
    actualizarSusCategories,
    eliminarSuscripcion
}
