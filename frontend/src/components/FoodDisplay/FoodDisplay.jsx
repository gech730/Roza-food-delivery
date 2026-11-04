import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ catagory, setCatagory, searchQuery, setSearchQuery }) => {
  const { food_list, labels } = useContext(StoreContext);

  const cleanQuery = (searchQuery || '').trim().toLowerCase();

  const filtered = (food_list || []).filter((item) => {
    const matchesCategory = catagory === "All" || item.category === catagory;
    const matchesSearch =
      !cleanQuery ||
      item.name.toLowerCase().includes(cleanQuery) ||
      (item.description && item.description.toLowerCase().includes(cleanQuery)) ||
      item.category.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesSearch;
  });

  const resetFilters = () => {
    if (setCatagory) setCatagory("All");
    if (setSearchQuery) setSearchQuery("");
  };

  return (
    <div className='food-display' id='food-display'>
      {/* Header with Title and Active Filter Tags */}
      <div className="food-display-header">
        <div>
          <p className="food-display-label">{labels.foodDisplay.label || "Fresh & Delicious"}</p>
          <h2>{catagory === "All" ? (labels.foodDisplay.topDishes || "All Ethiopian Dishes") : catagory}</h2>
        </div>

        <div className="food-display-stats-bar">
          <span className="fds-count">
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} available
          </span>

          {/* Active Filter Badges */}
          {(catagory !== "All" || cleanQuery) && (
            <div className="fds-active-filters">
              {catagory !== "All" && (
                <span className="fds-filter-tag" onClick={() => setCatagory && setCatagory("All")}>
                  {catagory} <span className="tag-remove">✕</span>
                </span>
              )}
              {cleanQuery && (
                <span className="fds-filter-tag" onClick={() => setSearchQuery && setSearchQuery("")}>
                  "{cleanQuery}" <span className="tag-remove">✕</span>
                </span>
              )}
              <button className="fds-clear-all" onClick={resetFilters}>
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="food-display-empty">
          <span className="empty-emoji">🍽️</span>
          <h3>No dishes found</h3>
          <p>
            {cleanQuery
              ? `No dishes match your search "${cleanQuery}" in ${catagory === "All" ? "all categories" : catagory}.`
              : labels.foodDisplay.noDishes || "No dishes found in this category."}
          </p>
          <button className="empty-reset-btn" onClick={resetFilters}>
            View All Dishes
          </button>
        </div>
      ) : (
        <div className="food-display-grid">
          {filtered.map((item, index) => (
            <FoodItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
