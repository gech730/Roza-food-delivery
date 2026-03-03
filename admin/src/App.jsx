import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/SideBar/Sidebar'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'

const App = () => {
   const url="http://localhost:4000"
  return (
    <div>
<ToastContainer/>
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path="add" element={<Add url={url}/>}/>
        <Route path="list" element={<List url={url}/>}/>
        <Route path="orders" element={<Orders/>}/>
      </Routes>
    </div>
    </div>
  
   
  )
}

export default App