const jwt = require("jsonwebtoken");



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

module.exports = {
    JWTvalid
}