import React, { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';
import { CONTACT_INFO } from '../../constants/homeData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Regular Delivery Order',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message or order inquiry.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! Your message has been sent. We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Regular Delivery Order',
        message: ''
      });
    }, 700);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-page-header">
        <span className="page-tag">We Are Here For You</span>
        <h1 className="page-title">Contact Roza Fast Food</h1>
        <div className="page-title-line"></div>
        <p className="page-subtitle">
          Whether you need a custom family catering mesob, have questions about your delivery, or want to partner with us in Addis Ababa.
        </p>
      </div>

      <div className="contact-two-column-layout">
        {/* Info Column */}
        <div className="contact-details-panel">
          <h2 className="panel-title">Direct Contact</h2>
          <p className="panel-desc">
            Reach out directly to our kitchen, dispatch team, or customer care representatives.
          </p>

          <div className="contact-points-list">
            <div className="contact-point">
              <span className="point-icon">📍</span>
              <div>
                <h4>Kitchen & Headquarters</h4>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="contact-point">
              <span className="point-icon">📞</span>
              <div>
                <h4>Phone / Order Hotline</h4>
                {CONTACT_INFO.phones.map((p, idx) => (
                  <p key={idx}><a href={`tel:${p}`}>{p}</a></p>
                ))}
              </div>
            </div>

            <div className="contact-point">
              <span className="point-icon">✉️</span>
              <div>
                <h4>Email Inquiries</h4>
                <p><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a></p>
              </div>
            </div>

            <div className="contact-point">
              <span className="point-icon">🕒</span>
              <div>
                <h4>Kitchen Hours</h4>
                <p>{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          <div className="contact-socials-group">
            <span className="socials-heading">Connect With Us:</span>
            <div className="socials-row">
              {CONTACT_INFO.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  <span>{soc.icon}</span>
                  <span>{soc.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-panel">
          <h2 className="panel-title">Send a Direct Message</h2>
          <p className="panel-desc">Fill in the fields below and our team will respond within 30 minutes.</p>

          <form onSubmit={handleSubmit} className="contact-panel-form" noValidate>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Abebe Bikila"
                required
              />
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abebe@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 911 00 00 00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Topic / Inquiry Type</label>
              <select name="interest" value={formData.interest} onChange={handleChange}>
                <option value="Regular Delivery Order">Regular Delivery Order</option>
                <option value="Celebration / Wedding Catering">Celebration / Wedding Catering</option>
                <option value="Family Platters">Family Platters</option>
                <option value="Corporate Office Lunch">Corporate Office Lunch</option>
                <option value="Event Orders">Event Orders</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message / Order Details *</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you'd like to order, preferred date/time, delivery address or questions..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-message-btn" disabled={submitting}>
              {submitting ? 'Sending Request...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
