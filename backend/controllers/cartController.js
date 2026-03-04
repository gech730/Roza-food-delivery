import userModel from '../models/userModel.js';
//  add to cart
const addToCart  = async (req,res)=>{
    try {
     const userData= await userModel.findOne({_id:req.body.userId});
     if(!userData) return res.json({success:false,message:req.body})
    const  cartData= await userData.cartData;
    if (!cartData[req.body.itemId]) {
        cartData[itemId]=1;
    } else {
        cartData[itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
   

}
//  remove from cart
const removeCart  = async ()=>{
    
}

//  get cart
const getCart  = async ()=>{
    
}
export {addToCart,removeCart,getCart};