const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) =>{
    
    return new Promise((resolve, reject) =>{

        const payload = {
            uid,
            // name, subid, labels
        };
        
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token ) =>{
            if (err){
                console.log(err);
                reject('Unable to generate a new JWT');
                
            } else {
                resolve ( token );
            }
        });
    });

}

module.exports = {
    generateJWT
}