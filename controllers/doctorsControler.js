const { response } = require('express');
const  Doctor = require('../models/doctors');


const getDoctors = async(req, res = response) =>{
    
    const doctors = await Doctor.find()
                                    .populate('user', 'name img' ) //datos del usuario que creó el hospital
                                    .populate('hospital', 'name img' ) //datos del usuario que creó el hospital
    
    res.json({
        ok:true,
        doctors
    });
}

const addDoctors = async(req, res = response) =>{
    const uid = req.uid;
    const doctor = new Doctor( { 
        
        user: uid,
        ...req.body
     } ); 

    try {
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with admin'
        })
    }
   
    res.json({
        ok:true,
        msg:'addDoctors'
    });
}
const updateDoctors = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'updateDoctors'
    });
}
const deleteDoctors = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'deleteDoctors'
    });
}



module.exports = {
    getDoctors,
    addDoctors,
    updateDoctors,
    deleteDoctors
}