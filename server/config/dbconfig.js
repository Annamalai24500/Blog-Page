const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_STRING);
const connect = mongoose.connection;
connect.on('connected',()=>{
    console.log('mongo db connection boiiiiii');
})
connect.on('error',(err)=>{
    console.log(err);
})