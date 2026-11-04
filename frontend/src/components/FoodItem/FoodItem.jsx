import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const qty = cartItems[id] || 0;
  const imageUrl = image?.startsWith('http') ? image : `${url}/images/${image}`;

  return (
    <article className={`food-card ${qty > 0 ? 'is-in-cart' : ''}`}>
      <div className="food-card-img-box">
        <img
          src={imageUrl}
          alt={name}
          className="food-card-img"
          loading="lazy"
          onError={(e) => { e.target.src = '/logo.png'; }}
        />
        <div className="food-card-img-overlay"></div>
        {qty > 0 && (
          <span className="food-card-cart-pill">
            ✓ {qty} in cart
          </span>
        )}
      </div>

      <div className="food-card-body">
        <div className="food-card-top">
          <h3 className="food-card-title" title={name}>{name}</h3>
        </div>

        <p className="food-desc" title={description}>{description}</p>

        <div className="food-card-footer">
          <div className="food-price-box">
            <span className="price-curr">ETB</span>
            <span className="price-val">{price}</span>
          </div>

          <div className="food-card-action">
            {qty === 0 ? (
              <button
                type="button"
                className="btn-add-to-cart"
                onClick={() => addToCart(id)}
                aria-label={`Add ${name} to cart`}
              >
                <svg className="cart-plus-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add</span>
              </button>
            ) : (
              <div className="modern-stepper-ctrl">
                <button
                  type="button"
                  className="stepper-action-btn stepper-minus"
                  onClick={() => removeFromCart(id)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="stepper-count">{qty}</span>
                <button
                  type="button"
                  className="stepper-action-btn stepper-plus"
                  onClick={() => addToCart(id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FoodItem;
