const jwt = require("jsonwebtoken");
const User = require("../models/users")


const JWTvalid = (req, res, next) => {

    // Read token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There's no token within the request",
        });

    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);



        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }
}

const validADMIN_ROLE = async (req, res, next) => {
    const uid = req.uid
    try {
        const userDB = await User.findById(uid)
        if (!userDB) {
            return res.status(404).json({ ok: false, msg: "User not found" })
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,

                msg: "Admin authentication is required"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }
}
const validADMIN_ROLE_o_SameUser = async (req, res, next) => {
    const uid = req.uid
    const id = req.params.id

    try {
        const userDB = await User.findById(uid)
        if (!userDB) {
            return res.status(404).json({ ok: false, msg: "User not found" })
        }

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {

            return res.status(403).json({
                ok: false,
                msg: "Admin authentication is required"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }
}



module.exports = {
    JWTvalid,
    validADMIN_ROLE,
    validADMIN_ROLE_o_SameUser
}