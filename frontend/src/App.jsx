import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Navarbar from './components/Navbar/Navarbar.jsx';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './components/Footer/Footer.jsx';
const App = () => {
  return (
   <div className='app'>
   <Navarbar/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeOrder' element={<PlaceOrder/>}/>
   </Routes>
   <Footer/>
   </div>
  )
}

export default App
