import React, { useState } from 'react';
import './Reviews.css';
import { toast } from 'react-toastify';
import { TESTIMONIALS_LIST } from '../../constants/homeData';

const ReviewsPage = () => {
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS_LIST);
  const [newReview, setNewReview] = useState({
    name: '',
    dish: '',
    rating: 5,
    quote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) {
      toast.error('Please enter your name and review comments.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const initials = newReview.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const created = {
        id: Date.now(),
        name: newReview.name,
        initials: initials || 'CU',
        rating: Number(newReview.rating),
        dish: newReview.dish || 'Chef Special Platter',
        quote: newReview.quote
      };

      setReviewsList([created, ...reviewsList]);
      setNewReview({ name: '', dish: '', rating: 5, quote: '' });
      setIsSubmitting(false);
      toast.success('Thank you for sharing your experience!');
    }, 500);
  };

  return (
    <div className="reviews-page">
      <div className="reviews-page-header">
        <span className="page-tag">Real Stories from Addis</span>
        <h1 className="page-title">Customer Love & Reviews</h1>
        <div className="page-title-line"></div>
        <p className="page-subtitle">
          Discover why food enthusiasts, families, and professionals across Addis Ababa trust Roza for their daily meals and special celebrations.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="reviews-cards-grid">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="review-story-card">
            <div className="review-card-stars">
              {'★'.repeat(rev.rating)}
            </div>

            <blockquote className="review-quote-text">
              “{rev.quote}”
            </blockquote>

            <div className="review-dish-tag">
              <span>🍲</span>
              <span>{rev.dish}</span>
            </div>

            <div className="review-author-row">
              <div className="review-avatar">{rev.initials}</div>
              <div>
                <h4 className="author-full-name">{rev.name}</h4>
                <span className="verified-badge">✓ Verified Customer</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave a Review Form */}
      <div className="submit-review-card">
        <h3 className="submit-review-title">Ordered from Roza recently? Share your experience!</h3>
        <p className="submit-review-sub">Your feedback inspires our chefs and helps us serve you better every day.</p>

        <form onSubmit={handleSubmit} className="review-input-form">
          <div className="review-form-row">
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Almaz Bekele"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Dish Ordered</label>
              <input
                type="text"
                placeholder="e.g. Derek Tibs / Fasting Beyaynetu"
                value={newReview.dish}
                onChange={(e) => setNewReview({ ...newReview, dish: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              >
                <option value="5">★★★★★ (5 - Excellent)</option>
                <option value="4">★★★★☆ (4 - Very Good)</option>
                <option value="3">★★★☆☆ (3 - Good)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Your Review & Experience *</label>
            <textarea
              rows="3"
              placeholder="Tell us about the flavor, delivery speed, and how you enjoyed your meal..."
              value={newReview.quote}
              onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
              required
            ></textarea>
          </div>

          <button type="submit" className="post-review-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Posting Review...' : 'Post Your Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsPage;
