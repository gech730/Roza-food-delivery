import React from 'react';
import './Services.css';
import { SERVICES_LIST } from '../../constants/homeData';

const Services = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="section-header text-center">
          <span className="section-tag">Beyond Everyday Dining</span>
          <h2 className="section-title">Services & Pricing</h2>
          <div className="section-title-line"></div>
          <p className="section-subtitle">
            From single meal delivery to grand celebrations, we provide authentic Ethiopian food solutions tailored to your occasion.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="services-grid">
          {SERVICES_LIST.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-box">
                <span className="service-icon">{service.icon}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>

              <div className="service-pricing">
                <span className="pricing-label">Starting at</span>
                <span className="pricing-value">{service.startingAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="services-footer-banner">
          <div className="services-footer-content">
            <span className="services-check-badge">✓</span>
            <p className="services-footer-note">
              All orders include fresh preparation and fast delivery across Addis Ababa.
            </p>
          </div>
          <button
            type="button"
            className="services-request-btn"
            onClick={scrollToContact}
          >
            Request Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;

