import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import { SERVICES_LIST } from '../../constants/homeData';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <div className="services-page-header">
        <span className="page-tag">Tailored for Every Occasion</span>
        <h1 className="page-title">Services & Catering Pricing</h1>
        <div className="page-title-line"></div>
        <p className="page-subtitle">
          From speedy daily delivery to large wedding banquets and corporate team feasts, we bring Addis Ababa's finest cuisine to you.
        </p>
      </div>

      <div className="services-cards-grid">
        {SERVICES_LIST.map((item) => (
          <div key={item.id} className="service-detail-card">
            <div className="service-card-icon-wrap">
              <span className="service-emoji">{item.icon}</span>
            </div>

            <h3 className="service-card-title">{item.title}</h3>
            <p className="service-card-text">{item.desc}</p>

            <div className="service-card-bottom">
              <div>
                <span className="starting-tag">Starting at</span>
                <span className="price-tag">{item.startingAt}</span>
              </div>
              <Link to="/contact" className="inquire-btn">
                Inquire Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate & Guarantee Banner */}
      <div className="services-assurance-box">
        <div className="assurance-text">
          <span className="assurance-check">🛡️</span>
          <div>
            <h3>The Roza Quality Guarantee</h3>
            <p>
              Every order is prepared with fresh ingredients, packed in insulated thermal containers, and delivered directly to your doorstep across Addis Ababa.
            </p>
          </div>
        </div>
        <Link to="/contact" className="custom-order-cta">
          Request Custom Quote
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;

