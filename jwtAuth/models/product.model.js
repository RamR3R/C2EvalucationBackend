const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    _id:{
        type : Number,
        required : true
    },
    title:{
        type: String,
        required : true
    },
    price : {
        type : Number,
        required:true,
    }
},{
    versionKey : false
});

const ProductModel = mongoose.model("product",productSchema);

module.exports = ProductModel;