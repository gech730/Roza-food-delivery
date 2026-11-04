import React from 'react';
import './About.css';
import { ABOUT_BADGES, PLACEHOLDER_IMAGES } from '../../constants/homeData';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="section-header text-center">
          <span className="section-tag">Our Heritage & Passion</span>
          <h2 className="section-title">Meet Roza Fast Food</h2>
          <div className="section-title-line"></div>
          <p className="section-subtitle">
            Born from generational recipes and the vibrant culture of Addis Ababa's traditional kitchens.
          </p>
        </div>

        <div className="about-grid">
          {/* Visual Column */}
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <img 
                src={PLACEHOLDER_IMAGES.about} 
                alt="Roza Fast Food Culinary Preparation" 
                className="about-image"
                loading="lazy"
              />
              <div className="about-image-badge">
                <span className="badge-number">12+</span>
                <span className="badge-text">Years of Culinary Tradition</span>
              </div>
            </div>
            <div className="about-accent-frame"></div>
          </div>

          {/* Story Column */}
          <div className="about-story">
            <span className="story-eyebrow">A Taste of Authentic Addis Ababa</span>
            <h3 className="story-title">
              Crafting timeless Ethiopian favorites with uncompromised love and speed.
            </h3>
            
            <p className="story-paragraph">
              At Roza Fast Food, we believe that Ethiopian cuisine is more than just dining—it is a sacred communal celebration of life, family, and connection around the shared <em>mesob</em>.
            </p>
            
            <p className="story-paragraph">
              Every sunrise, our chefs hand-select organic teff, roast whole aromatic spices, and slow-simmer our signature berbere wots for hours. Whether you crave tender, sizzling derek tibs, rich buttery kitfo with homemade ayib, or a colorful vegan Beyaynetu during fasting days, each dish is made to order and delivered hot.
            </p>

            <div className="about-quote">
              <p>“We don't cut corners on heritage. What our grandmothers cooked over clay stoves, we deliver fresh to your door in modern insulated elegance.”</p>
              <span className="quote-author">— Roza T., Founder & Master Chef</span>
            </div>
          </div>
        </div>

        {/* 4 Badges */}
        <div className="about-badges-grid">
          {ABOUT_BADGES.map((badge) => (
            <div key={badge.id} className="badge-item">
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-content">
                <h4 className="badge-title">{badge.title}</h4>
                <p className="badge-desc">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

