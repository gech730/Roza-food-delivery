import React, { useContext } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Hero from '../../components/Hero/Hero';
import MenuCard from '../../components/Menu/MenuCard';
import { ABOUT_BADGES, SERVICES_LIST, TESTIMONIALS_LIST, PLACEHOLDER_IMAGES } from '../../constants/homeData';

const Home = () => {
  const navigate = useNavigate();
  const { food_list, getTotalCartAmount, token } = useContext(StoreContext);

  // Top 6 featured dishes for homepage preview
  const featuredDishes = food_list.slice(0, 6);

  // Smart Order Now action
  const handleOrderNow = () => {
    if (getTotalCartAmount() > 0) {
      if (token) navigate('/order');
      else navigate('/cart');
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="home-container">
      {/* 1. Cinematic Hero with 2.5s Animated Moving Background Loop */}
      <Hero />

      {/* 2. Today's Featured Dishes Preview */}
      <section className="home-section home-featured-section">
        <div className="home-section-inner">
          <div className="home-section-header">
            <span className="section-tag">Chef's Recommendations</span>
            <h2 className="section-title">Popular Dishes Today</h2>
            <div className="section-title-line"></div>
            <p className="section-subtitle">
              Hand-selected traditional Ethiopian meals freshly prepared and delivered warm across Addis Ababa.
            </p>
          </div>

          <div className="home-menu-grid">
            {featuredDishes.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>

          <div className="home-section-cta">
            <Link to="/menu" className="home-view-all-btn">
              <span>View Full Menu ({food_list.length} Dishes)</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Meet Roza Heritage Snippet */}
      <section className="home-section home-about-section">
        <div className="home-section-inner">
          <div className="home-about-grid">
            <div className="home-about-visual">
              <div className="home-about-img-box">
                <img
                  src={PLACEHOLDER_IMAGES.about}
                  alt="Roza Fast Food Culinary Tradition"
                  className="home-about-img"
                  loading="lazy"
                />
                <div className="home-about-pill">
                  <span className="pill-years">12+</span>
                  <span className="pill-text">Years of Culinary Heritage</span>
                </div>
              </div>
            </div>

            <div className="home-about-content">
              <span className="section-tag">Tradition & Hospitality</span>
              <h2 className="home-about-title">Authentic recipes passed down through generations.</h2>
              <p className="home-about-desc">
                From slow-roasted whole berbere spices and pure teff injera to sizzling skillet derek tibs, Roza Fast Food honors Ethiopian culinary culture with every order.
              </p>

              <div className="home-badges-row">
                {ABOUT_BADGES.slice(0, 2).map((b) => (
                  <div key={b.id} className="home-mini-badge">
                    <span className="mini-badge-icon">{b.icon}</span>
                    <div>
                      <h4 className="mini-badge-title">{b.title}</h4>
                      <p className="mini-badge-desc">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="home-about-btn-wrap">
                <Link to="/about" className="home-read-story-btn">
                  <span>Read Our Heritage Story</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Preview */}
      <section className="home-section home-services-section">
        <div className="home-section-inner">
          <div className="home-section-header">
            <span className="section-tag">Catering & Corporate</span>
            <h2 className="section-title">Services Tailored for You</h2>
            <div className="section-title-line"></div>
            <p className="section-subtitle">
              Whether you need rapid individual delivery or a grand mesob banquet, we take care of every detail.
            </p>
          </div>

          <div className="home-services-grid">
            {SERVICES_LIST.slice(0, 3).map((s) => (
              <div key={s.id} className="home-service-card">
                <div className="service-icon-box">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-footer-row">
                  <span className="starting-label">Starting at <strong>{s.startingAt}</strong></span>
                  <Link to="/services" className="service-link">Details &rarr;</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="home-section-cta">
            <Link to="/services" className="home-view-all-btn">
              <span>View All 6 Services & Pricing</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Customer Love Preview */}
      <section className="home-section home-reviews-section">
        <div className="home-section-inner">
          <div className="home-section-header">
            <span className="section-tag">Customer Love</span>
            <h2 className="section-title">What Our Diners Say</h2>
            <div className="section-title-line"></div>
            <p className="section-subtitle">
              Honest feedback from people across Addis Ababa who enjoy Roza meals every week.
            </p>
          </div>

          <div className="home-reviews-grid">
            {TESTIMONIALS_LIST.map((rev) => (
              <div key={rev.id} className="home-review-card">
                <div className="review-stars">{'★'.repeat(rev.rating)}</div>
                <p className="review-quote">“{rev.quote}”</p>
                <div className="review-dish-badge">{rev.dish}</div>
                <div className="review-author">
                  <div className="author-avatar-circle">{rev.initials}</div>
                  <div>
                    <h4 className="author-name">{rev.name}</h4>
                    <span className="author-tag">Verified Diner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="home-section-cta">
            <Link to="/reviews" className="home-view-all-btn">
              <span>Read More Reviews & Post Yours</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Ready to Order CTA Banner */}
      <section className="home-cta-banner">
        <div className="home-cta-content">
          <span className="cta-eyebrow">Hot & Fresh at Your Doorstep</span>
          <h2 className="cta-headline">Ready for an Authentic Ethiopian Feast?</h2>
          <p className="cta-text">
            Choose from our sizzling tibs, organic injera combinations, rich wots, and fasting specialties prepared right now in our kitchen.
          </p>

          <div className="cta-buttons-row">
            <button
              type="button"
              onClick={handleOrderNow}
              className="cta-order-btn"
            >
              Order Now
            </button>
            <Link to="/contact" className="cta-contact-btn">
              Contact Kitchen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
