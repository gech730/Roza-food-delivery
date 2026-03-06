import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {useSearchParams,useNavigate}  from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import './Verify.css';
const Verify = () => {
    const navigate= useNavigate();
    const {url} =useContext(StoreContext)
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    
    const verifyPayment = async ()=>{
        const res= await axios.post(url+'/api/order/verify',{success,orderId});
        if(res.data.success){
            navigate('/myOrder');
        }
        else{
             navigate('/');
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
  <div className="spinner"></div>
    </div>
  )
}

export default Verify