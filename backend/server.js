import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
 const app=express();
 app.use(cors());
 app.use(express.json());
 connectDB();
 app.get("/",(req,res)=>{
  res.status(200).send("API working")
 });
 app.listen(4000, ()=>{
    try{console.log("Server running...on http://localhost:4000");}catch(err){
        console.log("ERROR During server runing:",err)
    }
   
 });
