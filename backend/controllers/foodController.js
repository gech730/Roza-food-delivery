import foodModel from "../models/foodModel";
const addFood= async (req,res)=>{
    
    try{
        await foodModel.create({price:24,image:"dsjjdpn",category:"factory product"})
    }
    catch(err){
        res.status(500).send("server error");
    }
}