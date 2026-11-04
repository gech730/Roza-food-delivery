import React, { useState, useContext, useEffect } from 'react';
import './Menu.css';
import { useSearchParams, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import MenuCard from '../../components/Menu/MenuCard';

const CATEGORIES = [
  { id: 'All', label: 'All Dishes' },
  { id: 'Injera & Stews', label: 'Injera & Stews' },
  { id: 'Tibs', label: 'Sizzling Tibs' },
  { id: 'Kitfo', label: 'Traditional Kitfo' },
  { id: 'Fasting Food', label: 'Fasting Food' },
  { id: 'Drinks', label: 'Drinks & Beverages' },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { food_list, getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  // Update tab if query parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (catId) => {
    setActiveTab(catId);
    if (catId === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter items by category and search query
  const filteredFood = food_list.filter((item) => {
    const cat = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    // Search query match
    const matchesSearch = !query || name.includes(query) || desc.includes(query) || cat.includes(query);
    if (!matchesSearch) return false;

    // Category match
    if (activeTab === 'All') return true;

    switch (activeTab) {
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
        return cat === activeTab.toLowerCase();
    }
  });

  const totalCartCount = Object.values(cartItems).reduce((acc, qty) => acc + (qty > 0 ? qty : 0), 0);
  const cartAmount = getTotalCartAmount();

  return (
    <div className="menu-page">
      {/* Page Header */}
      <div className="menu-page-header">
        <span className="page-tag">Prepared Daily with Love</span>
        <h1 className="page-title">Explore Our Ethiopian Menu</h1>
        <div className="page-title-line"></div>
        <p className="page-subtitle">
          From slow-simmered spicy berbere wots to fresh vegetarian fasting combos and prime sizzling skillet meats.
        </p>

        {/* Live Search Bar */}
        <div className="menu-search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search for doro wot, tibs, shiro, kitfo, injera..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="menu-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="menu-categories-bar">
        <div className="menu-categories-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Items */}
      {food_list.length === 0 ? (
        <div className="menu-empty-state">
          <div className="loading-spinner"></div>
          <p>Loading our kitchen selection...</p>
        </div>
      ) : filteredFood.length === 0 ? (
        <div className="menu-empty-state">
          <span className="empty-emoji">🍽️</span>
          <h3>No dishes found</h3>
          <p>No meals match your search "{searchQuery}" in this category.</p>
          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => {
              setActiveTab('All');
              setSearchQuery('');
              searchParams.delete('category');
              setSearchParams(searchParams);
            }}
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="menu-items-grid">
          {filteredFood.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Floating Bottom Quick-Checkout Bar if Cart has items */}
      {totalCartCount > 0 && (
        <div className="menu-cart-toast">
          <div className="cart-toast-info">
            <span className="cart-toast-count">{totalCartCount}</span>
            <div>
              <p className="cart-toast-label">Items in your cart</p>
              <p className="cart-toast-total">Total: <strong>{cartAmount} ETB</strong></p>
            </div>
          </div>
          <Link to="/cart" className="cart-toast-btn">
            <span>View Cart & Checkout</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
