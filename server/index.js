const express = require('express');
const env = require('dotenv').config();
const userroutes = require('./routes/userroutes');
const blogroutes = require('./routes/blogroutes');
const config = require('./config/dbconfig');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users',userroutes);
app.use('/api/blogs',blogroutes);
app.listen(5001,()=>{
    console.log('App is listening at port 5001 pookie bear');
});
