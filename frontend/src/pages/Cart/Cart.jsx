import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const cartFoods = food_list.filter(item => cartItems[item._id] > 0);
  const subtotal = getTotalCartAmount();
  const delivery = subtotal === 0 ? 0 : 50; // Updated delivery fee to 50 ETB

  return (
    <div className='cart-page'>
      <div className="cart-page-header">
        <h1>የእርስዎ ዘንቢል (Your Cart)</h1>
        <p>{cartFoods.length} {cartFoods.length !== 1 ? 'ምግቦች' : 'ምግብ'}</p>
      </div>

      {cartFoods.length === 0 ? (
        <div className="cart-empty">
          <span>🛒</span>
          <h3>ዘንቢልዎ ባዶ ነው (Your cart is empty)</h3>
          <p>እባክዎ ከምናሌያችን የኢትዮጵያ ምግቦችን ይምረጡ።</p>
          <button onClick={() => navigate('/')}>ምናሌ ይመልከቱ (Browse Menu)</button>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items-section">
            <div className="cart-items-head">
              <span>ምግብ (Item)</span><span>ዋጋ (Price)</span><span>ብዛት (Qty)</span><span>ድምር (Total)</span><span></span>
            </div>
            {cartFoods.map((item, i) => (
              <div key={i} className="cart-item">
                <div className="cart-item-info">
                  <img src={`${url}/images/${item.image}`} alt={item.name} onError={e => { e.target.src = '/logo.png'; }} />
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-cat">{item.category}</p>
                  </div>
                </div>
                <span className="cart-item-price">{item.price} ብር</span>
                <div className="cart-item-qty">
                  <button onClick={() => removeFromCart(item._id)}>−</button>
                  <span>{cartItems[item._id]}</span>
                  <button onClick={() => addToCart(item._id)}>+</button>
                </div>
                <span className="cart-item-total">{item.price * cartItems[item._id]} ብር</span>
                <button className="cart-item-remove" onClick={() => removeFromCart(item._id)} aria-label="Remove">✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>የክፍያ ማጠቃለያ (Summary)</h3>
            <div className="cart-summary-rows">
              <div className="cart-summary-row"><span>የምግብ ዋጋ (Subtotal)</span><span>{subtotal} ብር</span></div>
              <div className="cart-summary-row"><span>የማድረሻ ሂሳብ (Delivery)</span><span>{delivery} ብር</span></div>
              <div className="cart-summary-row total"><span>አጠቃላይ ድምር (Total)</span><span>{subtotal + delivery} ብር</span></div>
            </div>

            <div className="cart-promo">
              <input type="text" placeholder="የቅናሽ ኮድ ካሎት..." />
              <button>አስገባ (Apply)</button>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => navigate('/order')}
              disabled={subtotal === 0}
            >
              ወደ ክፍያ ይቀጥሉ (Checkout) →
            </button>
            <button className="cart-continue-btn" onClick={() => navigate('/')}>
              ← ተጨማሪ ይዘዙ (Continue Shopping)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
