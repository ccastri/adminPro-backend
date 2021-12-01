const { response } = require('express');

const Hospital = require('../models/hospitals');

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('user', 'name img',) //datos del usuario que creó el hospital



    res.json({
        ok: true,
        hospitals
    });
}

const addHospitals = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({

        user: uid,
        ...req.body
    });

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
        ok: true,
        msg: 'addHospitals'
    });
}
const updateHospitals = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid; 
    try {


        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital id is not found"
            });

        }

        const hospitalChanges = {
            ...req.body,
            user:uid
        }
        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, {new: true})

        res.json({
            ok: true,
            hospital: updatedHospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk with support"
        });
    }

}
const deleteHospitals = async(req, res = response) => {

    const id = req.params.id;
    // const uid = req.uid;  se necesita el id del hospital pero no del user
    try {


        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital id is not found"
            });

        }


        const deletedHospital = await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: `${hospital.name} has been deleted`,
            hospital: deletedHospital
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
    getHospitals,
    addHospitals,
    updateHospitals,
    deleteHospitals
}