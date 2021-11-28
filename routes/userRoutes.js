/*
    Ruta:/api/users
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { fieldValid } = require('../middlewares/field-validation')

const { getUsers, addUsers, updateUser, deleteUser } = require('../controllers/usersController');
const { JWTvalid } = require("../middlewares/jwt-validation");

const router = Router();

router.get('/',JWTvalid, getUsers);

router.post('/',
    [
        
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        //middleware siempre va despues de los check para que ya se hayan creado los errores cuando valide usuario
        fieldValid,
    ], //middleware para validar campos de UserScheme en el nuevo usuario
    addUsers
);

router.put('/:id',[

    JWTvalid,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').not().isEmpty(),
    fieldValid,
],
    updateUser
);

router.delete('/:id', 
   
    JWTvalid,
    deleteUser)

module.exports = router;