import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/SideBar/Sidebar'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'


const App = () => {
  return (
    <div>
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path="add" element={<Add/>}/>
        <Route path="list" element={<List/>}/>
        <Route path="orders" element={<Orders/>}/>
      </Routes>
    </div>
    </div>
  
   
  )
}

export default App