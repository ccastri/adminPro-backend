const { response } = require('express');
const bcrypt = require('bcryptjs');
// const { getMenuFront } = require('../helpers/menu')
const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');
const { getMenuFront } = require('../helpers/menu');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // E mail's verify
        const userDB = await User.findOne({ email });
        console.log(userDB)
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
        console.log(userDB.role);
        res.json({

            ok: true,
            token,
            menu: getMenuFront(userDB.role)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with management'
        })
    }
}
const loginGoogle = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });
        let user;
        //if user didn´t exists:
        if (!userDB) {
            user = new User({
                name: name,
                email,
                password: '@@@',
                img: picture,
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
        // Generate JWT
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            token: token,
            menu: getMenuFront(user.role)
        });
    } catch (error) {
        console.log(error);
    }
    res.status(401).json({
        ok: false,
        msg: 'Invalid Token',

    });
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Token generation
    const token = await generateJWT(uid);

    // 
    const user = await User.findById(uid)

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFront(user.role)
    });
}
module.exports = {
    login,
    loginGoogle,
    renewToken
}