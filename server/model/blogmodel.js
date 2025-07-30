const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('Blog',blogSchema);