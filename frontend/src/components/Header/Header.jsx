import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: '🇪🇹 Authentic Habesha Cuisine',
    titleLead: 'Taste the True Spirit of',
    titleHighlight: 'Ethiopian Traditions',
    description: 'Freshly baked Teff injera paired with slow-simmered Doro Wat, spiced tender Kitfo, and aromatic herb butter — cooked to perfection and delivered straight to your door.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=85&auto=format&fit=crop',
    dishName: 'Royal Doro Wat & Kitfo Feast',
    dishPrice: '550 ETB',
    tag: '🔥 #1 Most Ordered',
    rating: '4.9 ★ (1,840+ reviews)',
    category: 'Meat Dishes',
  },
  {
    id: 'slide-2',
    badge: '🌱 100% Plant-Based & Fasting',
    titleLead: 'Colorful, Wholesome & Healthy',
    titleHighlight: 'Traditional Beyaynetu',
    description: 'An authentic fasting feast featuring velvety Shiro Wat, rich Misir lentils, tender cabbage, and spiced collard greens layered on warm injera.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&q=85&auto=format&fit=crop',
    dishName: 'Special Fasting Beyaynetu',
    dishPrice: '250 ETB',
    tag: '🌿 Pure Fasting Friendly',
    rating: '4.9 ★ (1,420+ reviews)',
    category: 'Fasting Foods',
  },
  {
    id: 'slide-3',
    badge: '⚡ Sizzling Hot & Express Delivery',
    titleLead: 'Craving Sizzling Meat?',
    titleHighlight: 'Tender Spiced Tibs',
    description: 'Succulent cubes of lamb or beef flash-sautéed with fresh rosemary, garlic, and sliced green peppers. Arrives sizzling and hot in under 30 minutes.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85&auto=format&fit=crop',
    dishName: 'Sizzling Lamb & Beef Tibs',
    dishPrice: '450 ETB',
    tag: '⚡ 25-Min Express Delivery',
    rating: '5.0 ★ (980+ reviews)',
    category: 'Meat Dishes',
  },
  {
    id: 'slide-4',
    badge: '☕ Traditional Buna & Breakfast',
    titleLead: 'Awaken Your Senses With',
    titleHighlight: 'Ethiopian Buna Ceremony',
    description: 'Freshly roasted Ethiopian highlands coffee served alongside warm honey-spiced Chechebsa and crispy sambusas to kickstart your day.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&q=85&auto=format&fit=crop',
    dishName: 'Buna Ceremony & Chechebsa',
    dishPrice: '180 ETB',
    tag: '☕ Morning & Afternoon Delight',
    rating: '4.9 ★ (2,100+ reviews)',
    category: 'Breakfast',
  },
];

const Header = ({ onSearch, onSelectCategory }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-advance slides every 5.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[current];

  const handleNext = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm.trim());
    scrollToMenu();
  };

  const scrollToMenu = (cat) => {
    if (cat && onSelectCategory) onSelectCategory(cat);
    const target = document.getElementById('menu-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Carousel with Zoom/Pan Video-like effect ── */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-bg-layer ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Cinematic Ambient Overlays */}
      <div className="hero-gradient-overlay" />
      <div className="hero-mesh-glow" />

      {/* ── Main Hero Content ── */}
      <div className="hero-inner-container">
        {/* Left Column: Animated Text & Search */}
        <div className="hero-text-side" key={activeSlide.id}>
          <div className="hero-badge-pill">
            <span className="hero-badge-dot" />
            {activeSlide.badge}
          </div>

          <h1 className="hero-title-text">
            {activeSlide.titleLead}
            <span className="hero-title-gold">{activeSlide.titleHighlight}</span>
          </h1>

          <p className="hero-description-text">{activeSlide.description}</p>

          {/* Quick Search & Filter Bar */}
          <form className="hero-search-box" onSubmit={handleSearchSubmit}>
            <span className="search-icon-symbol">🔍</span>
            <input
              type="text"
              placeholder="Search dishes (e.g. Tibs, Shiro, Kitfo, Coffee)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">
              Find Food
            </button>
          </form>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <button
              className="hero-cta-primary"
              onClick={() => scrollToMenu(activeSlide.category)}
            >
              Order {activeSlide.category} →
            </button>
            <Link to="/myOrders" className="hero-cta-secondary">
              Track My Orders
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Featured Dish Showcase */}
        <div className="hero-showcase-side">
          <div
            className="hero-dish-card"
            key={`card-${activeSlide.id}`}
            onClick={() => scrollToMenu(activeSlide.category)}
          >
            <div className="hero-dish-media">
              <img
                src={activeSlide.image}
                alt={activeSlide.dishName}
                className="hero-dish-img"
              />
              <span className="hero-dish-tag">{activeSlide.tag}</span>
              <span className="hero-dish-price">{activeSlide.dishPrice}</span>
            </div>

            <div className="hero-dish-details">
              <h4>{activeSlide.dishName}</h4>
              <div className="hero-dish-meta">
                <span className="meta-rating">{activeSlide.rating}</span>
                <span className="meta-time">⏱️ 25–35 min</span>
              </div>
              <button className="hero-dish-btn">View on Menu ↓</button>
            </div>
          </div>

          {/* Floating Trust Pill */}
          <div className="floating-trust-pill">
            <span className="trust-icon">🛵</span>
            <div>
              <strong>Fastest Delivery</strong>
              <p>Hot on arrival in Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel Bottom Bar: Stats & Controls ── */}
      <div className="hero-bottom-bar">
        {/* Quick Stats */}
        <div className="hero-quick-stats">
          <div className="hqs-item">
            <strong>32+</strong>
            <span>Traditional Dishes</span>
          </div>
          <div className="hqs-divider" />
          <div className="hqs-item">
            <strong>4.9★</strong>
            <span>1,800+ Ratings</span>
          </div>
          <div className="hqs-divider" />
          <div className="hqs-item">
            <strong>25 min</strong>
            <span>Average Delivery</span>
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        <div className="hero-slide-controls">
          <button
            className="hero-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <div className="hero-dots">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                className={`hero-dot ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === current && <span className="hero-dot-fill" />}
              </button>
            ))}
          </div>

          <button
            className="hero-arrow-btn"
            onClick={handleNext}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
