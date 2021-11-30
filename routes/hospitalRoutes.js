/*
path: '/api/hospitals'
*/


const { Router } = require("express");
const { check } = require('express-validator');
const { getHospitals, 
        addHospitals,
        updateHospitals,
        deleteHospitals } = require("../controllers/hospitalsController");

const { fieldValid } = require('../middlewares/field-validation')

const { JWTvalid } = require("../middlewares/jwt-validation");

const router = Router();

router.get('/', getHospitals);

router.post('/',
    [
        JWTvalid, 
        check('name', "Institution's name is required").not().isEmpty(),
        fieldValid
    ], //middleware para validar campos de UserScheme en el nuevo usuario
    addHospitals,

);

router.put('/:id',
[],
updateHospitals
);

router.delete('/:id', 
   
    
deleteHospitals)

module.exports = router;