const express = require("express");
const PasswordModel = require("../models/password.model");
const encryptRouter = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr("RamsundarSivakumar123");
require("dotenv").config();


encryptRouter.post("/encryptmypwd",async(req,res)=>{
        const data = new PasswordModel();
        const encryptedpassword = cryptr.encrypt(req.body.password);

        data.id = req.body.id;
        data.password = encryptedpassword;
        await data.save();
        res.status(200).json({message:"Password stored successfully in encrypted form"});
});

encryptRouter.get("/getmypwd",async(req,res)=>{
    const data = await PasswordModel.findOne({id:req.query.id});
    if(data)
    {
        const decryptedString = cryptr.decrypt(data.password);
        res.status(200).json({message:"Password decrypted sucessfully", password : decryptedString});
    }
    else{
        res.status(404).json({message:"User id not found"});
    }
})

module.exports = encryptRouter;
