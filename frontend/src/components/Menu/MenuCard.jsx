import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { PLACEHOLDER_IMAGES } from '../../constants/homeData';

const MenuCard = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const count = cartItems[item._id] || 0;

  // Resolve image URL: Cloudinary URL vs local uploads vs fallback
  const getImageUrl = () => {
    if (!item.image) {
      return PLACEHOLDER_IMAGES.dishes[item.category] || PLACEHOLDER_IMAGES.dishes.default;
    }
    if (item.image.startsWith('http')) {
      return item.image;
    }
    return `${url}/images/${item.image}`;
  };

  return (
    <article className={`menu-card ${count > 0 ? 'is-in-cart' : ''}`}>
      {/* Fixed-ratio, non-distorted Image Frame */}
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

        <div className="menu-card-img-overlay"></div>

        {/* Category Badge on Top Left */}
        {item.category && (
          <span className="menu-card-category-badge">{item.category}</span>
        )}

        {/* In-Cart Pill Indicator on Top Right */}
        {count > 0 && (
          <span className="menu-card-cart-badge">
            <span className="cart-check-icon">✓</span> {count} in cart
          </span>
        )}
      </div>

      {/* Card Content with Uniform Baseline */}
      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title" title={item.name}>{item.name}</h3>
        </div>

        <p className="menu-card-description" title={item.description}>
          {item.description || 'Authentic traditional recipe prepared with fresh organic ingredients and aromatic spices.'}
        </p>

        {/* Modern Professional Footer with Price and Add to Cart Action */}
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
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="stepper-count">{count}</span>
                <button
                  type="button"
                  className="stepper-action-btn stepper-plus"
                  onClick={() => addToCart(item._id)}
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

export default MenuCard;
