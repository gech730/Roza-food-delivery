import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const qty = cartItems[id] || 0;

  return (
    <div className='food-card'>
      <div className="food-card-img">
        <img src={`${url}/images/${image}`} alt={name} onError={e => { e.target.src = '/logo.png'; }} />
        <div className="food-card-overlay">
          {qty === 0 ? (
            <button className="food-add-btn" onClick={() => addToCart(id)} aria-label="Add to cart">
              <img src={assets.add_icon_white} alt="Add" />
            </button>
          ) : (
            <div className="food-qty-ctrl">
              <button onClick={() => removeFromCart(id)}><img src={assets.remove_icon_red} alt="-" /></button>
              <span>{qty}</span>
              <button onClick={() => addToCart(id)}><img src={assets.add_icon_green} alt="+" /></button>
            </div>
          )}
        </div>
        {qty > 0 && <div className="food-cart-badge">{qty}</div>}
      </div>

      <div className="food-card-body">
        <div className="food-card-top">
          <h3>{name}</h3>
          <div className="food-rating">
            <img src={assets.rating_starts} alt="rating" />
          </div>
        </div>
        <p className="food-desc">{description}</p>
        <div className="food-card-footer">
          <span className="food-price">{price} ETB</span>
          {qty === 0 ? (
            <button className="food-order-btn" onClick={() => addToCart(id)}>Add +</button>
          ) : (
            <span className="food-in-cart">In cart ✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
