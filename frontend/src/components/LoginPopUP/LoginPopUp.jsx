import React, { useState } from 'react'
import './LOginPopUp.css'
import { assets } from '../../assets/assets'
const LoginPopUp = ({setShowLogin}) => {
    const [currentState,setCurrentState]=useState("Sign UP")
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}  alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:<input type="text" placeholder='your name' required/>}
            
            <input type="email" placeholder='your email' required id="" />
            <input type="password"  placeholder='password'/>
            <button>{currentState==="Sign UP"? "create account":"Login"}</button>
        </div>
       
         <div className="login-popup-conditio">
            <input type="checkbox" name="" id=""  required/>
            <p>By contuning, i agree the terms of privacy policy. </p>

         </div>
         {
         currentState==="Login"?
          <p>Create a new account <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
         : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
         }
         </form>
    </div>
  )
}

export default LoginPopUp