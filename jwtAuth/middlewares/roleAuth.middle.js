const jwt = require("jsonwebtoken");
require("dotenv").config();

const roles = {
    seller : ["GET","POST","DELETE"],
    user : ["GET"]
};

const roleAuth = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.secrectKey, function(err, decoded) {
        if(decoded)
        {   
            console.log(req.method,roles[decoded.data.role]);
            if(roles[decoded.data.role].includes(req.method))
            next();
            else
            res.status(400).json({message : "Login as Seller to post or delete Product"});
        }

        if(err)
        if(err.name == "TokenExpiredError")
        res.status(400).json({message : "Token expired Login again to gain Access"});
      });
}

module.exports = roleAuth;