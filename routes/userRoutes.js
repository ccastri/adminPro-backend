/*
    Ruta:/api/users
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { fieldValid } = require('../middlewares/field-validation')

const { getUsers, addUsers, updateUser, deleteUser } = require('../controllers/usersController');
const { JWTvalid, validADMIN_ROLE, validADMIN_ROLE_o_SameUser } = require("../middlewares/jwt-validation");

const router = Router();

router.get('/', JWTvalid, getUsers);

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

router.put('/:id', [

    JWTvalid,
    validADMIN_ROLE_o_SameUser,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').not().isEmpty(),
    fieldValid,
],
    updateUser
);

router.delete('/:id',

    [JWTvalid, validADMIN_ROLE,],
    deleteUser)

module.exports = router;