import Stripe from "stripe";
import axios from "axios";
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
const STRIPE_SECRET_KEY="sk_test_51T7Lz9P52Ry6fwxxsEVUf8EMHZpF7Ctn3Ll3Mfiium9daztsh6GbuelPo63fm12dqKUI4knzOWsLXUzf7lj2BDcU0032op0MYd";
const stripe = new Stripe(STRIPE_SECRET_KEY);


const placeOrder = async (req,res)=>{
     const frontend_url="http://localhost:5173";
    try {
        const newOrder= new orderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId,{cartData:{}});
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"gbp",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*0.83
            },
            quantity:item.quantity
        }));
        line_items.push({
             price_data:{
                currency:"gbp",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100*0.83
            },
            quantity:1
        });
       
 const session = await stripe.checkout.sessions.create({
  line_items:line_items,
  mode: "payment",
  success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
});        
res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}
const verifyPayment = async (req,res)=>{
    const {orderId,success}= req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
           res.json({success:true,message:"paid"});
        }
        else{
              await orderModel.findByIdAndDelete(orderId);
           res.json({success:false,message:"un paid"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
const userOrders = async (req,res)=>{
    const {userId}= req;
    try {
        const orders= await orderModel.find({userId});
        res.json({success:true,data:orders});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}
const listOrders = async (req,res)=>{
    try {
        const orders= await orderModel.find({});
        res.json({success:true,data:orders});
        
    } catch (error) {
        console.log(error);
         res.json({success:true,message:"error"});
    }
}
const updateStatus = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"status updated"
        });
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"error"})
    }
}


export const initializePayment = async (req, res) => {

  const { amount, email, first_name, last_name } = req.body;
 const key="CHASECK_TEST-7KEoOJwmgmd5SBcuMEzGZA54kUEyYCJF";
  try {

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: amount,
        currency: "ETB",
        email: email,
        first_name: first_name,
        last_name: last_name,
        tx_ref: "tx-" + Date.now(),
        callback_url: "http://localhost:5173/verify",
        return_url: "http://localhost:5173/success"
      },
      {
        headers: {
          Authorization: `Bearer ${key}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment failed" });
  }
};

export {placeOrder,verifyPayment,userOrders,listOrders,updateStatus,initializePayment};