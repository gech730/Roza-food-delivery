import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Navarbar from './components/Navarbar/Navarbar.jsx';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Home/Cart.jsx';
import PlaceOrder from './pages/Home/PlaceOrder.jsx';
const App = () => {
  return (
   <div className='app'>
   <Navarbar/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeOrder' element={<PlaceOrder/>}/>
   </Routes>
   
   </div>
  )
}

export default App
