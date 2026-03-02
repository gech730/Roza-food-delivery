import mongoose from 'mongoose'
const connectDB= async ()=>{
    const mongo_url="mongodb://localhost:27017/FOOD_DELIVERY";
    try{
        await mongoose.connect(mongo_url);
       
        console.log("Db connected");
    }catch(err){
        console.log(err);
        console.log("Db not connected");
    }
}
export default connectDB;