import mongoose from 'mongoose'
const userShema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
});
const userModel=mongoose.models.userModel || mongoose.model("userModel",userShema);
export default userModel;