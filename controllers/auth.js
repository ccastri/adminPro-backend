const {response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res=response) => {
    
    const { email, password } = req.body;
    
    try {

        // E mail's verify
        const userDB = await User.findOne({ email });
        if (!userDB){
            return res.status(404).json({

                ok:false,
                msg: 'Wrong credentials'
            })
        }
        const validPassword = bcrypt.compareSync(password, userDB.password)
            if(!validPassword){
                return res.status(400).json({
                    ok:false,
                    msg:'Wrong password'
                })
            }
            // generate web token -JWT
        const token =await generateJWT(userDB._id);    
        res.json({

            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk with mannager'
        })
    }
}

module.exports = {
    login
}