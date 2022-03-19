//const { response } = require('express');

const {Images} = require('../config/db.config');
const { sequelize } = require('../config/db.config');
const fs = require('fs');
const { Console } = require('console');
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
const getImagesProductId = async (req, res) => {
    const {image_data} = await Images.findOne({
        where: { id: req.params.id }
    });
    if (image_data){               
        //res.writeHead(200, { 'Content-Type': 'image/jpeg' });                
        console.log(image_data);
        res.json(image_data.toString('base64'));
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
}


const uploadImage = async( request, response) => {
    try {
		const img = fs.readFileSync(request.file.path);        
		const finalImg = {
			image_data: img,
            image_type: request.file.mimetype,
            image_name: request.file.filename,
            product_id: 10
		};
		await Images.create(finalImg);
		res.json({succes:'imagen cargada ala base datos'})
	} catch(e) {		
		console.log(`No se mando ${e}`);
	}	
}
module.exports = {
    imagesGet,
    imagesPost,
    getImagesProductId,
    uploadImage    
}