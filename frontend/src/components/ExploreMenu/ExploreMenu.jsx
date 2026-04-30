import React, { useContext } from 'react';
import { menu_list } from '../../assets/assets';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const ExploreMenu = ({ catagory, setCatagory }) => {
  const { labels } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explorer-menu'>
      <div className="explore-menu-header">
        <div>
          <p className="explore-menu-label">{labels.explore.label}</p>
          <h2>{labels.explore.title}</h2>
        </div>
        <p className="explore-menu-text">
          {labels.explore.subtitle}
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
            <p>{labels.categories[item.menu_name] || item.menu_name}</p>
          </div>
        ))} 
      </div>
      <div className="explore-menu-divider" />
    </div>
  );
};

export default ExploreMenu;
