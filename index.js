const express = require('express');
const { default: mongoose } = require('mongoose');
const encryptRouter = require('./encryption/Routes/encryption.routes');
const hashingRouter = require('./hashing/Routes/hashing.routes');
const userRouter = require('./jwtAuth/routes/user.routes');
const productRouter = require('./jwtAuth/routes/product.routes');
const jwtAuth = require('./jwtAuth/middlewares/jwtauth.middle');
const roleAuth = require('./jwtAuth/middlewares/roleAuth.middle');
const app = express()
require("dotenv").config();

app.use(express.json());

app.get('/', (req, res) => res.send('C2 evaluvation api'));

app.use(encryptRouter);

app.use(hashingRouter);

app.use("/user",userRouter);

app.use("/product",roleAuth,jwtAuth,productRouter);

app.listen(process.env.PORT, () => {
    try{
        mongoose.connect(process.env.mongoAtlasUrl)
        console.log(`Server running on port ${process.env.PORT}`);
    }
    catch(err){
        console.log(err);
    }
    
})
