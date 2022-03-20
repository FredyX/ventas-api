/*const fs = require('fs');
const path = require('path');

const deleteFolder = (path) => {
    let files = [];
    if( fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach( function(file,index){
            let curPath = path+file
            if( fs.statSync(curPath).isDirectory()){
                deleteFolder(curPath);
            }else{
                fs.unlinkSync(curPath)
            }
        });
        fs.rmdirSync(path);
    }
}
*/
const compararNombreImagenes = (archivosdir, imagenes) => {
    let arrayImages = [];
    imagenes.map( (imagen) => {
        archivosdir.map( (ardir) => {
            if(imagen.image_name === ardir){
                arrayImages.push(ardir);
            }
        })
    });

    return arrayImages;
}

module.exports = {
    compararNombreImagenes
}