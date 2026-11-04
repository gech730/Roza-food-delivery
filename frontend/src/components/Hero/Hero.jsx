import React, { useState, useEffect, useContext } from 'react';
import './Hero.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { HERO_SLIDES, HERO_TICKER_ITEMS } from '../../constants/homeData';

const Hero = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slideshow transition: moves and changes every 2.5 seconds in an infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Smart Order Now action
  const handleOrderNow = () => {
    const totalAmount = getTotalCartAmount();
    if (totalAmount > 0) {
      if (token) {
        navigate('/order');
      } else {
        navigate('/cart');
      }
    } else {
      navigate('/menu');
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="hero-section"
      id="hero"
      aria-label="Hero Ethiopian Cuisine Showcase"
    >
      {/* Animated Parallax & Moving Background Slides (2.5s loop) */}
      <div
        className="hero-slides-wrapper"
        style={{
          transform: `translate3d(0, ${Math.min(scrollY * 0.35, 180)}px, 0)`
        }}
      >
        {HERO_SLIDES.map((item, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={item.id}
              className={`hero-bg-slide ${isActive ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="hero-slide-overlay" />
            </div>
          );
        })}
      </div>

      {/* Main Foreground Content */}
      <div className="hero-content">
        <div className="hero-text-area">
          <div className="hero-badge animate-fade-in" key={`tag-${slide.id}`}>
            <span className="hero-badge-dot"></span>
            <span>{slide.tag}</span>
          </div>

          <h1 className="hero-headline animate-fade-in" key={`head-${slide.id}`}>
            {slide.title} <span className="hero-headline-accent">{slide.accent}</span>
          </h1>

          <p className="hero-subheading animate-fade-in" key={`sub-${slide.id}`}>
            {slide.subtitle}
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/menu" className="hero-btn hero-btn-primary">
            <span>View Menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>

          <button
            type="button"
            onClick={handleOrderNow}
            className="hero-btn hero-btn-secondary"
          >
            <span>Order Now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>

        {/* Slide Controls & 2.5s Progress Indicators */}
        <div className="hero-controls-row">
          <button
            type="button"
            onClick={prevSlide}
            className="hero-arrow-btn"
            aria-label="Previous Slide"
          >
            ‹
          </button>

          <div className="hero-slide-indicators">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slide-indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentSlide && (
                  <span key={currentSlide} className="indicator-progress-bar" />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="hero-arrow-btn"
            aria-label="Next Slide"
          >
            ›
          </button>
        </div>
      </div>

      {/* Smooth Continuous Infinite Scrolling Dish Marquee / Ticker */}
      <div className="hero-ticker-container">
        <div className="hero-ticker-track">
          {[...HERO_TICKER_ITEMS, ...HERO_TICKER_ITEMS].map((item, i) => (
            <div key={i} className="hero-ticker-item">
              <span className="ticker-icon">{item.icon}</span>
              <span className="ticker-text">{item.text}</span>
              <span className="ticker-separator">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
