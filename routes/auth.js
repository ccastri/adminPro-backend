/*
    Path: 'api/login '
*/


const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require('../controllers/auth');
const { fieldValid } = require("../middlewares/field-validation");

const router = Router();


router.post('/',[
 check('email', 'email is required').isEmail(),
 check('password', 'password is required').not().isEmpty(),
 fieldValid
], 
login
)







module.exports = router;