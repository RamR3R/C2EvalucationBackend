const mongoose = require("mongoose");
const hashingSchema = mongoose.Schema({
    hashedPassword:{
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

const HashingModel = mongoose.model("hashedpwds",hashingSchema);

module.exports = HashingModel;