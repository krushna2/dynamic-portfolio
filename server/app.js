const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'});
//Database connection
require('./db/conn');
//Convert json to object
app.use(express.json());
const PORT=process.env.PORT;

// const User=require("./model/userSchema");
app.use(require("./router/route"));

//Midddleware
const Midddleware=(req,res,next)=>{
    console.log("Hello this is middleware!");
    next();
}

app. get("/",(req,res)=>{
    
    res.send("Hello Here!")
});
app. get("/about",Midddleware,(req,res)=>{
    console.log("Hello this is about.");
    res.send("Hello, this is about page!")
});
app. get("/contact",(req,res)=>{
    res.send("Hello, this is contact page!")
});
app. get("/signin",(req,res)=>{
    res.send("Hello, this is signin page!")
});
app. get("/signup",(req,res)=>{
    res.send("Hello, this is signup page!")
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`)
});