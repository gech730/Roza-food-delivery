import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header.jsx';
import PromoBanner from '../../components/PromoBanner/PromoBanner.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';

const Home = () => {
  const [catagory, setCatagory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleHeroSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="home-container">
      {/* 1. Dynamic Animated Full-View Hero Carousel */}
      <Header onSearch={handleHeroSearch} onSelectCategory={setCatagory} />

      {/* 2. Today's Deals & Feature Highlights Advertisement Banner */}
      <PromoBanner onSelectCategory={setCatagory} />

      {/* 3. Correctly Placed Menu Section (Categories + Live Search + Dishes) */}
      <div id="menu-section" className="home-menu-wrapper">
        <ExploreMenu
          catagory={catagory}
          setCatagory={setCatagory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <FoodDisplay
          catagory={catagory}
          setCatagory={setCatagory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* 4. App Download Section */}
      <AppDownload />
    </div>
  );
};

export default Home;
