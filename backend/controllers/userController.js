import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
const JWT_SECRET="random#secret";
const login =async (req,res)=>{
    try{
   const {password,email}=req.body;
   const user = await userModel.findOne({email});
   if (!user) {
        return   res.json({successs:false,message:"user does not exist !"});
   }
   const isMatch= await bcrypt.compare(password,user.password);

   if (!isMatch) {
    return res.json({successs:false,message:"invalid credential"});
   }
   const token =createToken(user._id);
          res.json({successs:true,token});
    }catch(error){
        console.log("error")
        res.json({successs:false,message:"error"});
    }
};
 const createToken = async (userId)=>{
    return jwt.sign({userId},JWT_SECRET);
   
 }
const register =async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const exist=await userModel.findOne({email});
        if(exist) return res.json({success:false,messae:"user alreasdy exist"});

        if(!validator.isEmail(email)){
           return res.json({success:false,messae:"please use valid email"});
        }

        
        if(password.length<8){
           return res.json({success:false,messae:"please use Strong password"});
        }
        
        const hashedPassword= await bcrypt.hash(password,10);
         const newUser =new userModel({
            name,
            email,
            password:hashedPassword
         });

         const user= await newUser.save();
          const token =createToken(user._id);
          res.json({successs:true,token});
    }catch(error){
        console.log("error")
        res.json({successs:false,message:"error"});
    }
}
export {login,register};
