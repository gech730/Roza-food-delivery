import mongoose from 'mongoose'
const connectDB= async ()=>{
    try{
        await mongoose.connect("mongodb://localhost/:27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.7.0");
        console.log("Db connected");
    }catch(err){
        console.log(err);
        console.log("Db not connected");
    }
}
export default connectDB;