const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/imgUpdate');

const uploadFile = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    //validar tipos
    const validTypes = ['hospitals', 'doctors', 'users'];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Type doesnt match with users, doctors and hospitals'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) { //si no existe un req.files o si viene vacio manda el error status
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    //Procesar la imagen...
    const file = req.files.image;

    const shortname = file.name.split('.');
    const fileExt = shortname[shortname.length - 1] //last possition in array

    // console.log(shortname);
    //extension validation
    const validExt = ['png', 'jpg', 'jpeg', 'gif', 'dcm'];
    if (!validExt.includes(fileExt)) {
        return res.status(400).json({
            ok: false,
            msg: 'File format is not supported'
        });
    }

    //filename (unique identifier: uuid)
    const fileName = `${uuidv4()}.${fileExt}`

    //Path to store images
    const path = `./uploads/${type}/${fileName}`;

    // Move the image

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error moving the image'
            });
        }
        // DB uploading
        updateImg(type, id, fileName);


        res.json({
            ok: true,
            msg: 'file uploaded',
            fileName
        });
    });
}

const returnImg = (req, res = response) => {
    const type = req.params.type
    const photo = req.params.photo

    const pathImg = path.join(__dirname, `../uploads/${ type }/${ photo }`)

 
    
    // default image
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        const pathImg = path.join(__dirname, `../uploads/image-not.png`)
        res.sendFile(pathImg)
    }
}
module.exports = {
    uploadFile,
    returnImg
}