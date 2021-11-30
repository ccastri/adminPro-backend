const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    const since = Number(req.query.since) || 0; //si el ususario no define el parametro se toma 0 por defecto


    const [user, total] = await Promise.all([ //Me va a permitir optimizar el codigo porque ejecuta 2 promesas al tiempo

        User
        .find({}, 'name email role img google')
        .skip(since)
        .limit(5),
        
        User.countDocuments() //Para totalizar los registros
    ]);
                        
    res.json({

        ok: true,
        user,
        total
    });
}
const addUsers = async (req, res = response) => {
    const { email, password, name } = req.body;

    // const err = validationResult (req); //err generados en el middleware
    // console.log(req)

    // El usuario existe:

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registereddddd'
            });
        }
        const user = new User(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        // Guardar usuario
        await user.save(); //esperar a la promesa

        const token =await generateJWT(user.id);    
        res.json({

            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Undefined Error'
        });
    }

}

const updateUser = async (req, res = response) => {
    
    //TODO: Validar token y comprobar si el usuario es correcto
    
    const uid = req.params.id;
    try {
        
        const userDB = await User.findById(uid);
        if (!userDB ){
            return res.status(404).json({
                ok: false,
                msg: "There's no user matching with that id"
            });
            
        }
        //Updates
        const {password, google, email, ...fields} = req.body;

        if (userDB.email !== email) {
            const emailExist = await User.findOne({email});
            if (emailExist ) {
                return res.status(400). json ({
                    ok: false,
                    msg: 'Email already exists'
                });
            }

        }
        fields.email = email;
        // delete fields.password;
        // delete fields.google;

        const updatedUser = await User.findByIdAndUpdate( uid, fields, {new: true});



        res.json({
            ok: true,
            user: updatedUser
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unspecting error'
        })
    }
}

const deleteUser = async (req, res=response) =>{
    const uid = req.params.id;
    try {

        const userDB = await User.findById(uid);
        if (!userDB ){
            return res.status(404).json({
                ok: false,
                msg: "There's no user matching with that id"
            });
        }
            // Si el usuario existe se borra (lo recomendable es desactivarlo)
        await User.findOneAndDelete(uid);
 
        res.json({

            ok: true,
            msg: 'user has been deleted'
        })
        
    } catch (error) {
        console.log(object);
        res.status(500).json({
            ok: false,
            msg: "User doesn't exists. The account wasn't deleted"
        })
    }
}

module.exports = {
    getUsers,
    addUsers,
    updateUser,
    deleteUser,
}