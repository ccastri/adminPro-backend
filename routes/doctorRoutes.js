/*
/api/doctors
*/
const { Router } = require("express");
const { check } = require('express-validator');
const { getDoctors, addDoctors, updateDoctors, deleteDoctors } = require("../controllers/doctorsControler");
const { fieldValid } = require('../middlewares/field-validation')

const { JWTvalid } = require("../middlewares/jwt-validation");

const router = Router();

router.get('/', getDoctors);

router.post('/',
    [
        JWTvalid,
        check('name', " Doctor's name is required").not().isEmpty(),
        check('hospital', "Institution's id must be a valid one").isMongoId(),
        fieldValid
    ], //middleware para validar campos de UserScheme en el nuevo usuario
    addDoctors,

);

router.put('/:id',
    [
        JWTvalid,
        check('name', " Doctor's name is required").not().isEmpty(),
        check('hospital', "Institution's id must be a valid one").isMongoId(),
        fieldValid
    ],
    updateDoctors
);

router.delete('/:id',

        JWTvalid,

   

    deleteDoctors)

module.exports = router;