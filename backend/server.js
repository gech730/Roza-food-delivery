import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from "dotenv";
dotenv.config();

 const app=express();
 app.use(cors());
 app.use(express.json());
 connectDB();
 app.use("/images", express.static("uploads"));
 app.get("/",(req,res)=>{
  res.status(200).send("API working")
 });
 app.use("/api/food",foodRouter);
 app.use('/api/user',userRouter);
  app.use('/api/cart',cartRouter);
  app.use('/api/order',orderRouter);

 app.listen(4000, ()=>{
    try{console.log("Server running...on http://localhost:4000");}catch(err){
        console.log("ERROR During server runing:",err)
    }
   
 });

 