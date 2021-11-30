const { response } = require('express');

const Hospital = require('../models/hospitals');

const getHospitals = async(req, res = response) =>{
   
    const hospitals = await Hospital.find()
                                    .populate('user', 'name img', ) //datos del usuario que creó el hospital



    res.json({
        ok:true,
        hospitals
    });
}

const addHospitals = async(req, res = response) =>{
   
    const uid = req.uid;
    const hospital = new Hospital( { 
        
        user: uid,
        ...req.body
     } );

    try {
        const hospitalDB = await hospital.save();
        res.status(500).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk with admin'
        })
    }
   
    res.json({
        ok:true,
        msg:'addHospitals'
    });
}
const updateHospitals = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'updateHospitals'
    });
}
const deleteHospitals = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'deleteHospitals'
    });
}



module.exports = {
    getHospitals,
    addHospitals,
    updateHospitals,
    deleteHospitals
}