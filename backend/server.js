import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';

 const app=express();
 app.use(cors());
 app.use(express.json());
 connectDB();
 app.use("/images", express.static("uploads"));
 app.get("/",(req,res)=>{
  res.status(200).send("API working")
 });
 app.use("/api/food",foodRouter);
 app.listen(4000, ()=>{
    try{console.log("Server running...on http://localhost:4000/api/food");}catch(err){
        console.log("ERROR During server runing:",err)
    }
   
 });

 