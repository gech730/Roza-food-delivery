import React, { useState,useEffect } from 'react';
import axios from 'axios'
import './List.css'
import { toast } from 'react-toastify';
const List = () => {
   const url="http://localhost:4000"
  const [list,setList]=useState([]);
  const fetchList= async ()=>{
    const res=await axios.get(`${url}/api/food/get`);
    if(res.data.success){
      setList(res.data.data);

    }
    else{
       toast.error("error")
    }
  }
 const removeFood=async (foodId)=>{
  const res=await axios.delete(`${url}/api/food/remove`,{data:{_id:foodId}});
   await fetchList();
       if(res.data.success){
           toast.success(res.data.message);
           
       }
     else{
       toast.error(res.data.message);
     }
 }

  useEffect(()=>{
   ()=>
   { fetchList();}
  },[])

  return (
    <div className='add list flex-col'>
      <p>All Foods List</p>
      <div className="list-table"><div className="list-table-format title">
          <p>Image</p>
            <p>Name</p>
              <p>Category</p>
                <p>Price</p>
                <p>Action</p>
        </div>
          {
            list.map((item,index)=>{
              return(
                <div key={index} className="list-table-format">
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                </div>
              )
            })
          }
        </div>
    
    </div>
  )
}

export default List