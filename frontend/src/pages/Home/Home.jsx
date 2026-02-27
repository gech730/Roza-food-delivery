import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header.jsx';
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx"
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
const Home = () => {
  const [catagory,setCatagory]=useState("All")
  return (
    <div>
     <Header/>
     <ExploreMenu catagory={catagory} setCatagory={setCatagory} />
      <FoodDisplay catagory={catagory}  />
      <AppDownload/>
    </div>
  )
}

export default Home