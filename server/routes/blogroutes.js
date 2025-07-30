const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const Blog = require('../model/blogmodel');
require('dotenv').config();
router.post('/add-blog',authMiddleware,async(req,res)=>{
    try{    
        const {name,imageURL,author,description} = req.body;
         if (!name || !imageURL || !author || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const blog = await Blog.create({name,imageURL,author,description});
        res.json({
            success:true,
            blog:{
                id:blog._id,
                name:blog.name,
                imageURL:blog.imageURL,
                author:blog.author,
                description:blog.description
            },
            message:"Blog ccreated successfully"
        });

    }catch(error){
        console.error(error);
        res.json({success:false,message:error.message});
    }
});
router.get('/get-all-blogs',authMiddleware,async(req,res)=>{
    try{
        const response = await Blog.find();
        res.json({success:true,data:response,message:"Blogs fetched successfully"});
    }catch(error){
        console.log(error.message?.data?.response);
        res.json({success:false,message:error.message});
    }
});
module.exports = router;