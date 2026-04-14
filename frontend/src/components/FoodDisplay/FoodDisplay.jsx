import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ catagory }) => {
  const { food_list } = useContext(StoreContext);
  const filtered = food_list.filter(item => catagory === "All" || catagory === item.category);

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <p className="food-display-label">Fresh & Delicious</p>
        <h2>{catagory === "All" ? "Top Dishes Near You" : catagory}</h2>
      </div>

      {filtered.length === 0 ? (
        <div className="food-display-empty">
          <span>🍽️</span>
          <p>No dishes found in this category.</p>
        </div>
      ) : (
        <div className="food-display-grid">
          {filtered.map((item, index) => (
            <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
