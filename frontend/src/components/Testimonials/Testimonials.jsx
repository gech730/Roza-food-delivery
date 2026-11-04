import React from 'react';
import './Testimonials.css';
import { TESTIMONIALS_LIST } from '../../constants/homeData';

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="reviews">
      <div className="testimonials-container">
        <div className="section-header text-center">
          <span className="section-tag">Addis Ababa Loves Roza</span>
          <h2 className="section-title">Customer Love</h2>
          <div className="section-title-line"></div>
          <p className="section-subtitle">
            Read heartfelt stories from local food lovers, busy professionals, and families who invite Roza to their tables daily.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS_LIST.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
              </div>

              <blockquote className="testimonial-quote">
                “{review.quote}”
              </blockquote>

              <div className="testimonial-dish">
                <span className="dish-ordered-icon">🍲</span>
                <span className="dish-ordered-text">{review.dish}</span>
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">{review.initials}</div>
                <div className="author-info">
                  <h4 className="author-name">{review.name}</h4>
                  <span className="author-badge">Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

