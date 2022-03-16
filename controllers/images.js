const { response } = require('express');
const bcryptjs = require('bcryptjs');
const {Images} = require('../config/db.config');

const imagesPost = async(request, response) => {
    try{
        const images = await Images.create(request.body);
        response.json(images);
    }catch(error){
        response.status(400).json({msg: ` Error ${error}`});
    }
}

const imagesGet = async(request, response) => {
    const {
        image_type, image_name,
        image_data, product_id
    } = request.body;
       
}