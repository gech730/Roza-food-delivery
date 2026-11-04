import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import { ABOUT_BADGES, PLACEHOLDER_IMAGES } from '../../constants/homeData';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-page-header">
        <span className="page-tag">Generations of Flavor</span>
        <h1 className="page-title">The Roza Story</h1>
        <div className="page-title-line"></div>
        <p className="page-subtitle">
          Preserving authentic Ethiopian culinary traditions and sharing the joy of communal dining across Addis Ababa.
        </p>
      </div>

      <div className="about-main-card">
        <div className="about-main-grid">
          <div className="about-image-column">
            <div className="about-image-frame">
              <img
                src={PLACEHOLDER_IMAGES.about}
                alt="Chef preparing authentic Ethiopian cuisine"
                className="about-chef-img"
              />
              <div className="experience-pill">
                <span className="exp-years">12+</span>
                <span className="exp-text">Years of Heritage</span>
              </div>
            </div>
          </div>

          <div className="about-content-column">
            <span className="story-eyebrow">Our Kitchen, Our Roots</span>
            <h2 className="story-heading">Food is the heartbeat of our heritage.</h2>

            <p className="story-text">
              Roza Fast Food was founded with one clear mission: to bring the warmth, aroma, and slow-cooked perfection of homemade Ethiopian meals to your dining table at modern fast-delivery speed.
            </p>

            <p className="story-text">
              We never compromise on authenticity. Our injera is baked with 100% natural pure teff flour, naturally fermented to achieve the perfect spongy texture and signature sour note. Our rich berbere and mitmita blends are sun-dried, stone-ground, and simmered with pure niter kibbeh (clarified spiced butter) to produce depth of flavor you can taste in every single bite.
            </p>

            <blockquote className="founder-quote">
              “In Ethiopia, sharing food from the same mesob is the highest form of love and respect. We cook every dish with that exact devotion.”
              <cite>— Roza T., Founder & Executive Chef</cite>
            </blockquote>

            <div className="about-cta-row">
              <Link to="/menu" className="about-order-btn">
                <span>Explore Our Menu</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link to="/contact" className="about-contact-btn">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Badges */}
      <div className="about-badges-section">
        <h3 className="badges-section-title">Why Addis Chooses Roza</h3>
        <div className="badges-cards-grid">
          {ABOUT_BADGES.map((b) => (
            <div key={b.id} className="about-badge-card">
              <span className="badge-icon-box">{b.icon}</span>
              <div>
                <h4 className="badge-card-title">{b.title}</h4>
                <p className="badge-card-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

