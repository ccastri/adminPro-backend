const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // E mail's verify
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({

                ok: false,
                msg: 'Wrong credentials'
            })
        }
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            })
        }
        // generate web token -JWT
        const token = await generateJWT(userDB._id);
        res.json({

            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with mannager'
        })
    }
}
const loginGoogle = async (req, res = response) => {
    const googleToken = req.body.token;

    try {
        const { name, email, photo } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });
        if (!userDB) {
            user = new User({
                name: name,
                email,
                password: '@@@',
                img: photo,
                google: true
            });

        } else {
            //User existent
            user = userDB;
            user.google = true;
            // user.password: "@@@" 
        }
        // Save user in DB
        await user.save();

        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            token: token
        });
    } catch (error) {
        console.log(error);
    }
    res.status(401).json({
        ok: false,
        msg: 'Invalid Token',

    });
}

const renewToken = async (req, res = response) =>{

    const uid = req.uid;

    // Token generation
    const token = await generateJWT(uid.id);
    
    res.json({
        ok: true,
        token
    });
}
    module.exports = {
        login,
        loginGoogle,
        renewToken
    }