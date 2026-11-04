import React, { useState, useContext } from 'react';
import './Menu.css';
import { StoreContext } from '../../context/StoreContext';
import MenuCard from './MenuCard';

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Injera & Stews', label: 'Injera & Stews' },
  { id: 'Tibs', label: 'Tibs' },
  { id: 'Kitfo', label: 'Kitfo' },
  { id: 'Fasting Food', label: 'Fasting Food' },
  { id: 'Drinks', label: 'Drinks' },
];

const MenuGrid = () => {
  const { food_list } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Categorization matching logic
  const filterFood = (items, tab) => {
    if (!items || items.length === 0) return [];
    if (tab === 'All') return items;

    return items.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const name = (item.name || '').toLowerCase();

      switch (tab) {
        case 'Injera & Stews':
          return (
            cat.includes('injera') ||
            cat.includes('stew') ||
            cat.includes('rolls') ||
            cat.includes('pasta') ||
            cat.includes('noodles') ||
            name.includes('wot') ||
            name.includes('stew') ||
            name.includes('injera')
          );
        case 'Tibs':
          return (
            cat.includes('tibs') ||
            cat.includes('sandwich') ||
            cat.includes('meat') ||
            name.includes('tibs') ||
            name.includes('beef')
          );
        case 'Kitfo':
          return (
            cat.includes('kitfo') ||
            name.includes('kitfo') ||
            name.includes('gored')
          );
        case 'Fasting Food':
          return (
            cat.includes('veg') ||
            cat.includes('fasting') ||
            cat.includes('salad') ||
            name.includes('shiro') ||
            name.includes('misir') ||
            name.includes('beyaynetu') ||
            name.includes('salad') ||
            name.includes('veg')
          );
        case 'Drinks':
          return (
            cat.includes('drink') ||
            cat.includes('desert') ||
            cat.includes('cake') ||
            cat.includes('beverage') ||
            name.includes('juice') ||
            name.includes('coffee') ||
            name.includes('tea') ||
            name.includes('drink')
          );
        default:
          return cat === tab.toLowerCase();
      }
    });
  };

  const filteredItems = filterFood(food_list, activeTab);
  
  // If active filter has no exact matches, fallback gracefully to items with related tags or all
  const displayItems = filteredItems.length > 0 ? filteredItems : food_list;
  
  // Paginate or limit initial display
  const visibleItems = showAll ? displayItems : displayItems.slice(0, 9);

  return (
    <section className="menu-section" id="menu">
      <div className="menu-container">
        <div className="section-header text-center">
          <span className="section-tag">Fresh Daily Selection</span>
          <h2 className="section-title">Our Ethiopian Menu</h2>
          <div className="section-title-line"></div>
          <p className="section-subtitle">
            Authentic, slow-simmered wots, sizzling skillet tibs, and comforting fasting favorites freshly prepared for you.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs-wrapper">
          <div className="menu-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`menu-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(cat.id);
                  setShowAll(false);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        {food_list.length === 0 ? (
          <div className="menu-loading">
            <div className="menu-spinner"></div>
            <p>Loading our delicious menu...</p>
          </div>
        ) : (
          <div className="menu-cards-grid">
            {visibleItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* View Full Menu CTA */}
        {displayItems.length > 9 && (
          <div className="menu-full-cta">
            <button
              type="button"
              className="view-full-menu-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Fewer Dishes' : `View Full Menu (${displayItems.length} Dishes)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;

