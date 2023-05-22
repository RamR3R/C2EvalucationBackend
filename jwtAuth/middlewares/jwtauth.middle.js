const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.secrectKey, function(err, decoded) {
        if(decoded)
        {   
            console.log(decoded);
            next();
        }
        else
        res.status(400).json({message : "Please provide valid token to access the products"});

        if(err)
        if(err.name == "TokenExpiredError")
        res.status(400).json({message : "Token expired Login again to gain Access"});
      });
}

module.exports = jwtAuth;