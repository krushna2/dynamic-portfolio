const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

//routing using express router
router.get("/",(req,res)=>{
    res.send("Welcome to home page of router js");
});

//Using Promises
// router.post("/register",(req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error:"Please fill all fields."});
//     }
//     User.findOne({email:email})
//         .then((userExist)=>{
//             if(userExist)
//             {
//                 return res.status(422).json({error:"Email already exist"});
//             }

//             const user = new User({name,email,phone,work,password,cpassword});

//             user.save().then(()=>{
//                 res.status(201).json({message:"User Registered Successfully."});
//             }).catch((err)=>{
//                 res.status(500).json({error:"Failed to register"});
//             })
//         }).catch((err)=>{
//             console.log(err);
//         });
// });

//Using async-awaits
router.post("/register",async(req,res)=>{
    try{
        const {name,email,phone,work,password,cpassword} = req.body;
        if(!name || !email || !phone || !work || !password || !cpassword)
        {
            return res.status(422).json({error:"Please fill all fields."});
        }
        const userExist= await User.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({error:"Email already exist"});
        }else if(password != cpassword)
        {
            return res.status(422).json({error:"Password doesn't match."});
        }else{
            const user = new User({name,email,phone,work,password,cpassword});
            await user.save();
            res.status(201).json({message:"User Registered Successfully."});
        }
    }catch(err)
    {
        console.log(err);
    }
});

//Login Route
router.post("/signin",async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(422).json({error:"Please fill all fields."});
        }
        const userLogin = await User.findOne({email:email});
        // userLogin gives us whole json of user i.e all details, which are match with email.
        const userPassword = await bcrypt.compare(password,userLogin.password);

        //get token
        let token = await userLogin.generateAuthToken();
        console.log(token);
        //store token in cookie
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+86400000),
            httpOnly:true
        })

        if(!userLogin)
        {
            return res.status(400).json({error:"Invalid Email."});
        }else if(!userPassword){
            return res.status(400).json({error:"Invalid Password."});
        }
        else{
            return res.json({message:"User Login Successfully."});
        }
    }catch(err)
    {
        console.log(err);
    }
});

module.exports = router;