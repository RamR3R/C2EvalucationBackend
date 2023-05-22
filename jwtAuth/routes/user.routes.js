const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

userRouter.post("/signup",async(req,res)=>{
    const data = new UserModel();
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            if(err)
            res.status(400).json({err});
            
            data.password = hash;
            data.id = req.body.id;
            data.name = req.body.name;
            data.role = req.body.role;
            await data.save();
        });
    });
    res.status(200).json({message:"User Created Successfully"});
});

userRouter.post("/login",async(req,res)=>{
const data = await UserModel.findOne({id:req.body.id});
if(data)
{
    bcrypt.compare(req.body.password, data.password, function(err, result) {
        if(result)
        {
            const token = jwt.sign({
                data: data,
              }, process.env.secrectKey, { expiresIn: '1min' });

            const refreshToken = jwt.sign({
            data: data,
            }, process.env.refershSecrectKey, { expiresIn: '5min' });

            res.status(200).json({message:"Login sucessfull", token : token, refreshToken : refreshToken});
        }

        else
        res.status(400).json({message:"Password wrong", response : false});
    });
    
}
else{
    res.status(404).json({message:"User id not found"});
}
})


module.exports = userRouter;