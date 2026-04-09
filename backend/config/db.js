import mongoose from 'mongoose'
const connectDB= async ()=>{
    try{
        // connecting to database
        await mongoose.connect(MONGO_URI);
        console.log("Db connected");
    }catch(err){
        console.log(err);
        console.log("Db not connected");
    }
}
export default connectDB;