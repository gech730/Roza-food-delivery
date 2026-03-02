import foodModel from '../models/foodModel.js';
const addFood= async (req,res)=>{
    
    try{
       const food1 =await  foodModel.create({name:req.body.name,description:req.body.description,price:req.body.price,image:req.body.image,category:req.body.category});
        res.status(201).json(food1);
    }
    catch(err){
        res.status(500).json({message:"server error"});
    }
}
const readFood= async (req,res)=>{
    
    try{
     const food= await foodModel.finnd({});
     if(!food) return res.status(404).json({message:"not found"});
     res.status(200).json(food);
    }
    catch(err){
        res.status(500).json({message:err});
    }
}
export {addFood,readFood}