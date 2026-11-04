import React, { useState } from 'react';
import './PromoBanner.css';
import { toast } from 'react-toastify';

const PromoBanner = ({ onSelectCategory }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText("ROZA20");
    setCopied(true);
    toast.success("Promo code 'ROZA20' copied!");
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToMenu = (cat) => {
    if (onSelectCategory && cat) onSelectCategory(cat);
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="promo-section">
      {/* ── Feature Highlights Strip ── */}
      <div className="promo-features-grid">
        <div className="promo-feature-card">
          <div className="pfc-icon">🚀</div>
          <div>
            <h4>30-Min Fast Delivery</h4>
            <p>Hot, fresh & sealed packaging across Addis Ababa</p>
          </div>
        </div>

        <div className="promo-feature-card">
          <div className="pfc-icon">🍲</div>
          <div>
            <h4>100% Authentic Habesha</h4>
            <p>Fresh Teff injera, pure spices & traditional recipes</p>
          </div>
        </div>

        <div className="promo-feature-card">
          <div className="pfc-icon">💳</div>
          <div>
            <h4>Instant Digital Pay</h4>
            <p>Secure Chapa payments, Telebirr & CBE verified</p>
          </div>
        </div>

        <div className="promo-feature-card">
          <div className="pfc-icon">🌱</div>
          <div>
            <h4>Fasting & Halal Certified</h4>
            <p>Dedicated fasting platters & premium meat dishes</p>
          </div>
        </div>
      </div>

      {/* ── Hot Deal Advertisement Banner ── */}
      <div className="ad-banner">
        <div className="ad-banner-glow" />
        <div className="ad-content">
          <div className="ad-badge">
            <span className="ad-badge-pulse" />
            🔥 TODAY'S HOT DEAL
          </div>
          <h3 className="ad-title">
            Get <span className="ad-highlight">20% OFF</span> on All Ethiopian Meat & Fasting Platters!
          </h3>
          <p className="ad-desc">
            Order your favorite Kitfo, Tibs, or colorful Beyaynetu and enjoy complimentary Ethiopian spiced tea or soft drink on orders over 450 ETB.
          </p>

          <div className="ad-actions">
            <button className="ad-btn-primary" onClick={() => scrollToMenu("Meat Dishes")}>
              Claim Deal Now →
            </button>
            <div className="ad-code-box" onClick={copyCode} title="Click to copy code">
              <span className="code-label">PROMO CODE:</span>
              <span className="code-value">ROZA20</span>
              <span className="copy-tag">{copied ? "✓ Copied" : "Copy"}</span>
            </div>
          </div>
        </div>

        <div className="ad-visual">
          <div className="ad-visual-circle">
            <span className="ad-circle-badge">20% OFF</span>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&auto=format&fit=crop"
              alt="Ethiopian Feast Special"
              className="ad-circle-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
