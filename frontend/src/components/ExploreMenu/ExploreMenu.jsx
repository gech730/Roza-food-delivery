import React, { useContext } from 'react';
import { menu_list, assets } from '../../assets/assets';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const ExploreMenu = ({ catagory, setCatagory, searchQuery, setSearchQuery }) => {
  const { labels, food_list } = useContext(StoreContext);

  const getCategoryCount = (catName) => {
    if (!food_list || food_list.length === 0) return '';
    if (catName === 'All') return food_list.length;
    return food_list.filter(item => item.category === catName).length;
  };

  return (
    <section className='explore-menu' id='menu-section'>
      {/* Anchor for backward compatibility with old navbar links */}
      <span id='explorer-menu' style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />

      <div className="explore-menu-top">
        <div className="explore-menu-headings">
          <span className="explore-menu-tag">🇪🇹 Authentic Flavors</span>
          <h2 className="explore-menu-title">Explore Our Ethiopian Menu</h2>
          <p className="explore-menu-sub">
            {labels.explore.subtitle || "From fasting-friendly and meat dishes to coffee and snacks — choose the meal you love."}
          </p>
        </div>

        {/* Live Search & Filter in Menu Header */}
        <div className="menu-search-wrapper">
          <div className="menu-search-bar">
            <span className="ms-icon">🔍</span>
            <input
              type="text"
              placeholder="Search in menu..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button
                className="menu-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Horizontal Scrolling Selector */}
      <div className="explore-menu-list">
        {/* All Dishes Option */}
        <div
          onClick={() => setCatagory("All")}
          className={`explore-menu-item ${catagory === "All" ? 'active' : ''}`}
        >
          <div className="explore-menu-img-wrap all-dishes-badge">
            <span className="all-icon-emoji">🍽️</span>
          </div>
          <div className="explore-item-text">
            <p className="item-name">All Dishes</p>
            <span className="item-count">{getCategoryCount('All')} items</span>
          </div>
        </div>

        {/* Categories from menu_list */}
        {menu_list.map((item, index) => {
          const count = getCategoryCount(item.menu_name);
          return (
            <div
              key={index}
              onClick={() => setCatagory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              className={`explore-menu-item ${catagory === item.menu_name ? 'active' : ''}`}
            >
              <div className="explore-menu-img-wrap">
                <img src={item.menu_image} alt={item.menu_name} />
              </div>
              <div className="explore-item-text">
                <p className="item-name">{item.menu_name}</p>
                {count > 0 && <span className="item-count">{count} items</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="explore-menu-divider" />
    </section>
  );
};

export default ExploreMenu;
