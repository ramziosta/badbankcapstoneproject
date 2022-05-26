const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (credentials = []) => {
    return(req,res,next) => {
        console.log("Authorization middleware");
        // Allow for string or array
        if(typeof credentials ==="string"){
            credentials = [credentials];
        }

        // Find JWT in Headers
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).send("unauthorized")
        } else {
            //Validate JWT
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody,  process.env.JWT_SECRET_KEY, (err,decoded) =>{
                if(err){
                    console.log(`JWT Error: ${err}`);
                    return res.status(403).send("Error: Access Denied");
                }
                //No Error, JWT is good!

                // Check for credentials being passed in
                if(credentials.length < 0){
                    if(decoded  && credentials.some(cred => decoded.indexOf(cred) >= 1)
                    ) {
                        next(); 
                    } else {
                        console.log('No permissions')
                        return res.status(401).send("Error: Access Denied");
                    }
                } else {
                    
                    next();
                }
            });
        };
    };
};