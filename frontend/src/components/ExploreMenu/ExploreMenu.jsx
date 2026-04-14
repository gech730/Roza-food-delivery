import React from 'react';
import { menu_list } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({ catagory, setCatagory }) => (
  <div className='explore-menu' id='explorer-menu'>
    <div className="explore-menu-header">
      <div>
        <p className="explore-menu-label">What are you craving?</p>
        <h2>Explore Our Menu</h2>
      </div>
      <p className="explore-menu-text">
        From traditional injera platters to grilled tibs — find your favourite Ethiopian dish.
      </p>
    </div>

    <div className="explore-menu-list">
      {menu_list.map((item, index) => (
        <div
          key={index}
          onClick={() => setCatagory(prev => prev === item.menu_name ? "All" : item.menu_name)}
          className={`explore-menu-item ${catagory === item.menu_name ? 'active' : ''}`}
        >
          <div className="explore-menu-img-wrap">
            <img src={item.menu_image} alt={item.menu_name} />
          </div>
          <p>{item.menu_name}</p>
        </div>
      ))}
    </div>
    <div className="explore-menu-divider" />
  </div>
);

export default ExploreMenu;
