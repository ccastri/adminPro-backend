const { response } = require('express');

const User = require('../models/users');
const Hospital = require('../models/hospitals');
const Doctor = require('../models/doctors');

const getAll = async (req, res = response) => {

    const search = req.params.search; //REQUEST PARA EXTRAER PARAMETROS DEL URL
    const regex = new RegExp(search, 'i')

    const [users, doctors, hospitals] = await Promise.all([
        await User.find({ name: regex }),  //nombre es igual al parametro de busqueda?              
        await Doctor.find({ name: regex }),  //nombre es igual al parametro de busqueda?              
        await Hospital.find({ name: regex })  //nombre es igual al parametro de busqueda?              


    ])
    res.json({

        ok: true,
        users,
        doctors,
        hospitals
    });
}
const getDocsCollection = async (req, res = response) => {

    const tabla = req.params.tabla; //REQUEST PARA EXTRAER PARAMETROS DEL URL
    const search = req.params.search; //REQUEST PARA EXTRAER PARAMETROS DEL URL
    const regex = new RegExp(search, 'i')

    let data = [];

    switch (tabla) {
        case 'doctors':
            data = await Doctor.find({ name: regex })  //nombre es igual al parametro de busqueda?                        
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })  //nombre es igual al parametro de busqueda?              
                .populate('user', 'name img')
            break;
        case 'users':

            data = await User.find({
                name: regex
            })  //nombre es igual al parametro de busqueda?              

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Table  data is not corresponding. Table must be users/doctors/hospitals'
            });
    }
    res.json({

        ok: true,
        results: data
    })


}

module.exports = {
    getAll,
    getDocsCollection
}