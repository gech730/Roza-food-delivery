import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'


const App = () => {
  return (
    <div>
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
    </div>
    </div>
  
   
  )
}

export default App