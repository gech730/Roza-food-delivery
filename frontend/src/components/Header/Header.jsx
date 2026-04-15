import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className='hero'>
    <div className="hero-overlay" />
    <div className="hero-content">

      <div className="hero-badge">
        🇪🇹 Authentic Ethiopian Cuisine
      </div>

      <h1 className="hero-title">
        Taste the Heart of
        <span>Ethiopia</span>
      </h1>

      <p className="hero-subtitle">
        Freshly prepared injera, tibs, kitfo, and more — delivered hot to your door.
        Experience the rich flavors of Habesha cooking.
      </p>

      <div className="hero-actions">
        <a href="#explorer-menu" className="hero-btn-primary">
          Explore Menu →
        </a>
        <Link to="/myOrders" className="hero-btn-secondary">
          Track My Order
        </Link>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <span>500+</span>
          <p>Dishes</p>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span>4.9★</span>
          <p>Rating</p>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span>30 min</span>
          <p>Delivery</p>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span>Free</span>
          <p>First Order</p>
        </div>
      </div>

    </div>
  </div>
);

export default Header;
