const express = require("express");
const ProductModel = require("../models/product.model");
const productRouter = express.Router();

productRouter.get("/",async(req,res)=>{
    const data = await ProductModel.find();
    res.status(200).json({message:"Products Fetched" , data : data});
});

productRouter.post("/addnew",async(req,res)=>{
    const data = new ProductModel();
    data.title = req.body.title;
    data.price = req.body.price;
    data._id = req.body._id;
    await data.save();
    res.status(200).json({message:"Product Added Successfully"});
});

productRouter.delete("/delete/:id",async(req,res)=>{
    try{
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Product Deleted From DB"});
    }
    catch(err)
    {
        res.status(400).json({message:"Error unable to delete"})
    }
});


module.exports = productRouter;