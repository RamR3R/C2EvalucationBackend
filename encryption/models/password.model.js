const mongoose = require("mongoose");
const passswordSchema = mongoose.Schema({
    password:{
        type: String,
        required : true
    },
    id : {
        type : String,
        required:true,
        unique : true
    }
},{
    versionKey : false
});

const PasswordModel = mongoose.model("password",passswordSchema);

module.exports = PasswordModel;