const express = require("express");
const HashingModel = require("../models/hashing.model");
const bcrypt = require("bcrypt");
const hashingRouter = express.Router();

require("dotenv").config();


hashingRouter.post("/hashmypwd",async(req,res)=>{
        const data = new HashingModel();
        let pass;
        bcrypt.genSalt(8, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if(err)
                res.status(400).json(err);
                
                data.hashedPassword = hash;
                data.id = req.body.id;
                await data.save();
            });
        });
        res.status(200).json({message:"Password stored successfully in hashed form"});
});

hashingRouter.post("/verifymypwd",async(req,res)=>{
    const data = await HashingModel.findOne({id:req.body.id});
    if(data)
    {
        bcrypt.compare(req.body.password, data.hashedPassword, function(err, result) {
            if(result)
            res.status(200).json({message:"Password matched with hashed password", response : true});

            else
            res.status(400).json({message:"Password wrong", response : false});
        });
        
    }
    else{
        res.status(404).json({message:"User id not found"});
    }
})

module.exports = hashingRouter;
