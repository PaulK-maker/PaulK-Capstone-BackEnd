
// //import the express module
// import express from 'express';
// //create an new router object
// const router =express.Router();
// //import the user model
// // const User =require('../models/User');
// import User from '../models/userModel.js';

// // import userModel from '../models/User.js'; 

// //route for user registration 
// router.post('/register',async(req, res)=>{

//     //destructure username and password
//     try{
//         const {username,password}= req.body;
//         //create new user instance
//         const newUser=new User({username,password});
//       //save new user in the database  
//     await newUser.save();
//     res.status(201).json({message: 'User Registered'})

//     }catch(error){
//         res.status(500).json({error:'registration failed'});
    

//     }
    
// });

// // route for user Login
// router.post('/login', async(req,res)=> {
//     try{
//         //username destructure
//         const{username,password} =req.body;
//         //find the user by username
//         const user=await User.findOne({username});

//         if (!user|| user.password !==password) {
//             return res.status(401).json({error:'Invalid Credentials'});

//         }
//         res.status(200).json({message: 'login successful'});
//     }catch(err){
//         res.status(500).json({error:'Login failed'})

//     }
    

// })

// export default router;