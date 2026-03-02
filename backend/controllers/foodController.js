import food_list from '../models/foodModel.js';
import fs from 'fs'
const addFood= async (req,res)=>{
    let image_filename=`${req.file.filename}`
    try{
       const newFood =new food_list({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category});

        await newFood.save();
        res.status(201).json({succeess:true,message: "Food added successfully",newFood});
    }
    catch(err){
        res.status(500).json({succeess:true,message:" error",err});
    }
}

const readFood= async (req,res)=>{
    
    try{
     const foods= await food_list.find({});
     if(!foods) return res.status(404).json({success:false,message:"not found"});
     res.status(200).json({success:false,data:foods});
    }
    catch(err){
        res.status(500).json({success:false,message:err});
    }
}
const deleteFood= async (req,res)=>{
    
    try{
     const food= await food_list.findById(req.body._id);
     if(!food) return res.status(404).json({success:false,message:"not found"});
     fs.unlink(`uploads/${food.image}`,()=>{});
     await food_list.findByIdAndDelete(req.body._id);
     res.status(201).json({success:true,message:"food Removed"});
  
    }
    catch(err){
        res.status(500).json({success:false,message:err});
    }
}
export {addFood,readFood,deleteFood}