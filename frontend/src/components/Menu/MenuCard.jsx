import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { PLACEHOLDER_IMAGES } from '../../constants/homeData';

const MenuCard = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const count = cartItems[item._id] || 0;

  // Resolve image URL: Cloudinary full URL vs local vs placeholder fallback
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
    <div className="menu-card">
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
        {item.category && (
          <span className="menu-card-category-badge">{item.category}</span>
        )}
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{item.name}</h3>
          <span className="menu-card-price">{item.price} ETB</span>
        </div>

        <p className="menu-card-description">{item.description}</p>

        <div className="menu-card-footer">
          {count === 0 ? (
            <button
              type="button"
              className="menu-add-btn"
              onClick={() => addToCart(item._id)}
              aria-label={`Add ${item.name} to cart`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="menu-qty-control">
              <button
                type="button"
                className="qty-btn"
                onClick={() => removeFromCart(item._id)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-count">{count}</span>
              <button
                type="button"
                className="qty-btn"
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
  );
};

export default MenuCard;

