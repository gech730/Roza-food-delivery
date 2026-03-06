import React,{useState} from 'react';
import { Route,Routes } from 'react-router-dom';
import Navarbar from './components/Navbar/Navarbar.jsx';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopUp from './components/LoginPopUP/LoginPopUp.jsx';
import Verify from './pages/verify/Verify.jsx';
import UserOrder from './pages/userOrder/UserOrder.jsx';
const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
   <Navarbar setShowLogin={setShowLogin} />
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myOrder' element={<UserOrder/>}/>
   </Routes>
   <Footer/>
   </div>
    </>
 
  )
}

export default App
