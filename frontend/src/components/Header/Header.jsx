import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const Header = () => {
  const { labels } = useContext(StoreContext);

  return (
    <div className='hero'>
      <div className="hero-overlay" />
      <div className="hero-content">

        <div className="hero-badge">
          {labels.hero.badge}
        </div>

        <h1 className="hero-title">
          {labels.hero.titleMain}
          <span>{labels.hero.titleAccent}</span>
        </h1>

        <p className="hero-subtitle">
          {labels.hero.subtitle}
        </p>

        <div className="hero-actions">
          <a href="#explorer-menu" className="hero-btn-primary">
            {labels.hero.exploreButton}
          </a>
          <Link to="/myOrders" className="hero-btn-secondary">
            {labels.hero.ordersButton}
          </Link>
        </div>

        <div className="hero-stats">
          {labels.hero.stats.map((item, index) => (
            <React.Fragment key={`hero-stat-${index}`}>
              {index > 0 && <div className="hero-stat-divider" />}
              <div className="hero-stat">
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Header;
