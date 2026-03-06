import React from 'react'
import './Orders.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify' 
import { assets } from '../../assets/assets'
const Orders = ({url}) => {

  const [orders,setOrders]= useState([]);
  const fetchAllOrders = async ()=>{
const res= await axios.post(url+"/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
        console.log(res.data.data)
    }
    else{
      toast.error("error")
    }
  }
  const statusHandler= async (event,orderId)=>{
    const status=event.target.value;

   const res= await axios.post(url+'/api/order/status',{orderId,status});
   if(res.data.success){
     fetchAllOrders();
    toast.success(res.data.message)
   }
   else{
      toast.error(res.data.message)
   }
  }
  useEffect(()=>{
    fetchAllOrders();
  },[]);

  return (
    <div className='order add'>
      <h3>OrderPage</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div className="">
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return item.name + " X " +item.quantity;
                  }
                  else{
                     return item.name + " X " +item.quantity +",";
                  }
                })}
              </p>
              <p className='order-item-name'>
                {
                  order.address.firstName + " "+order.address.lastName
                }
              </p>
              <div className="order-item-address">
                <p>{  order.address.street + ", "}</p>
                <p>{  order.address.city + ", "+order.address.state + ", "+order.address.country + ", "+order.address.zipcode + ", "}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
             <p>${order.amount}</p>
             <select onChange={(event)=>statusHandler(event,order._id)}  value={order.status}>
              <option value="food processing">Food Processing</option>
              <option value="out for delivery">Out For Delivery</option>
              <option value="delivered">Delivered</option>
             </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders