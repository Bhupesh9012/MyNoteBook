const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
var jwt =require('jsonwebtoken');
var fetchuser =require('../middleware/fetchuser');
  
const JWT_SECRET='Hello i am young Lord';

//Route1-create user using : POST "/api/auth/createuser" .Does't req auth .no login requireds

router.post('/createuser',[
   body('name','enter a valid name').isLength({min:3}),
   body('email','enter a valid email').isEmail(),
   body('password','password must be atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
   
   //if there are errors,return Bad request and the errors
   
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()}); 
   }
   //check wheather the user with this email exists already
   try {
   let user = await User.findOne({email:req.body.email});
   if(user){
      return res.status(400).json({error:"sorry user this with email aready exists"})
   }
   const salt =await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt)
   //create a new user
    user = await User.create({
      name:req.body.name,
      password:secPass,
      email:req.body.email,
   }) 
   //catch error
   const data={
      user:{
         id:user.id
      }
   }
   const authtoken = jwt.sign(data,JWT_SECRET);
   //  res.json(user)
res.json({authtoken})
       } catch (error) {
         console.error(error.message);
         res.status(500).send("Internal server error occured");
   }
})   

//Route2-authenticate a User using Post"/api/auth/login-no login required
router.post('/login',[
   body('email','enter a valid email').isEmail(),
   body('password','password cannot be blank').exists()
],async(req,res)=>{
   
const errors =validationResult(req);
if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()});
}
const{email,password}=req.body;
try{
let user =await User.findOne({email});
if(!user){
   return res.status(400).json({error:"plese try to login with correct credentials"});
}
const passwordCompare = await bcrypt.compare(password,user.password);
if(!passwordCompare){
   return res.status(400).json({error:"please try to login with correct credentials"})
}
const data={
   user:{
      id:user.id
   }
}
const authtoken=jwt.sign(data,JWT_SECRET);
res.json({authtoken})
}catch(error){
   console.error(error.message);
   res.status(500).send("Internal server Error occured");

}

});
//Route3-Get logged in  User details using Post"/api/auth/getuser- login required
router.post('/getuser',fetchuser,async(req,res)=>{
try {
   const userId=req.user.id;
   const user = await User.findById(userId).select("-password")
   res.send(user);
} catch (error) {
   console.error(error.message);
   res.status(500).send({message:"Internal server error"});
}
})
module.exports=router