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
const updateDoctors = async(req, res = response) =>{


    const id = req.params.id;
    const uid = req.uid; 
    try {


        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: "Doctor's id is not found"
            });

        }

        const doctorChanges = {
            ...req.body,
            user:uid
        }
        const updatedDoctors = await Doctor.findByIdAndUpdate(id, doctorChanges, {new: true})

        res.json({
            ok: true,
            doctor: updatedDoctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk with support"
        });
    }
}
const deleteDoctors = async(req, res = response) =>{
    const id = req.params.id;

    try {


        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: "Doctor's id is not found"
            });

        }

 
        const deletedDoctors = await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: `${doctor.name} has been deleted`,
            doctor: deletedDoctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk with support"
        });
    }
}



module.exports = {
    getDoctors,
    addDoctors,
    updateDoctors,
    deleteDoctors
}