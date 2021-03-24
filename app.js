const express = require("express");
const app = express();

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

app.listen(8000,()=>{
    console.log("Server is running on port 8000.")
});