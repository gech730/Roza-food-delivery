import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { PLACEHOLDER_IMAGES } from '../../constants/homeData';

const MenuCard = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const count = cartItems[item._id] || 0;

  // Resolve image URL safely for Cloudinary URLs, local uploads, or imported asset modules
  const getImageUrl = () => {
    if (!item.image) {
      return PLACEHOLDER_IMAGES.dishes[item.category] || PLACEHOLDER_IMAGES.dishes.default;
    }
    if (typeof item.image === 'string') {
      if (
        item.image.startsWith('http') ||
        item.image.startsWith('/') ||
        item.image.startsWith('data:') ||
        item.image.startsWith('blob:')
      ) {
        return item.image;
      }
      return `${url}/images/${item.image}`;
    }
    return item.image;
  };

  return (
    <article className={`menu-card ${count > 0 ? 'is-in-cart' : ''}`}>
      {/* 1. Dedicated Non-Distorted Food Image Container */}
      <div className="menu-card-image-box">
        <img
          src={getImageUrl()}
          alt={item.name}
          className="menu-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGES.dishes.default;
          }}
        />

        <div className="menu-card-img-overlay" />

        {/* Category Pill Tag on Top Left */}
        {item.category && (
          <span className="menu-card-category-badge">{item.category}</span>
        )}

        {/* Responsive Cart Badge on Top Right */}
        {count > 0 ? (
          <span className="menu-card-cart-badge">
            <span className="cart-check-icon">✓</span> {count} in cart
          </span>
        ) : (
          <span className="menu-card-rating-badge">★ 4.9</span>
        )}
      </div>

      {/* 2. Structured Card Body with Uniform Baseline */}
      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title" title={item.name}>{item.name}</h3>
        </div>

        <p className="menu-card-description" title={item.description}>
          {item.description || 'Authentic traditional recipe prepared with fresh organic ingredients and aromatic spices.'}
        </p>

        {/* 3. Modern Professional Footer: Price + Add to Cart Button */}
        <div className="menu-card-footer">
          <div className="menu-card-price-box">
            <span className="price-curr">ETB</span>
            <span className="price-val">{item.price}</span>
          </div>

          <div className="menu-card-action">
            {count === 0 ? (
              <button
                type="button"
                className="btn-add-to-cart"
                onClick={() => addToCart(item._id)}
                aria-label={`Add ${item.name} to cart`}
              >
                <svg className="cart-plus-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="modern-stepper-ctrl">
                <button
                  type="button"
                  className="stepper-action-btn stepper-minus"
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Decrease quantity"
                  title="Remove one"
                >
                  −
                </button>
                <span className="stepper-count" title={`${count} in cart`}>
                  {count}
                </span>
                <button
                  type="button"
                  className="stepper-action-btn stepper-plus"
                  onClick={() => addToCart(item._id)}
                  aria-label="Increase quantity"
                  title="Add one more"
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

export default MenuCard;
