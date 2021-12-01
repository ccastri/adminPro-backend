/*
    Path: 'api/login '
*/


const { Router } = require("express");
const { check } = require("express-validator");
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { fieldValid } = require("../middlewares/field-validation");
const { JWTvalid } = require("../middlewares/jwt-validation");

const router = Router();


router.post('/',[
 check('email', 'email is required').isEmail(),
 check('password', 'password is required').not().isEmpty(),
 fieldValid
], 
login
);
router.post('/google',[
 
 check('token', "Google's token is required. Sign-in in localhost to gather it").not().isEmpty(),
 fieldValid
], 
loginGoogle
);
router.get('/renew',
 
 JWTvalid, 
 renewToken
);







module.exports = router;