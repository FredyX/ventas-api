//const { response } = require('express');

const {Images} = require('../config/db.config');
const { sequelize } = require('../config/db.config');
const imagesPost = async(request, response) => {
    try{
       /* const images = await Images.create(request.body);
        response.json({images});*/
        //const image_data = request.headers.content-type
        console.log(request);
        response.json({exito:'exito'});
    }catch(error){
        response.status(405).json({msg: ` Error en vargar imagen ${error}`});
    }
}

const imagesGet = async(request, response) => {    
    try{
        const {id} = request.params;        
        const images = await Images.findOne({
            where: { id },
        });
        const {product_id, image_name, image_data, image_type} = images;
        const data = {
            product_id,
            image_name,
            image_data,
            image_type
        }
        response.json(data);
    }catch(error){
        response.status(400).json({error});
    }
}
const getImagesProductId = async(request, response) =>{
    try {
        const {id} = request.params;
        const [results, metadata] = await sequelize.query("SELECT * FROM users");        
        response.json({results,metadata});
    } catch (error) {
        console.log('Falla general loco',error);
    }
}

module.exports = {
    imagesGet,
    imagesPost,
    getImagesProductId    
}