import React, { useState } from 'react';
import './ContactSection.css';
import { toast } from 'react-toastify';
import { CONTACT_INFO } from '../../constants/homeData';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Delivery Order',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
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
      toast.error('Please include a short message or order request.');
      return;
    }

    setSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! Your request has been received. We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Delivery Order',
        message: ''
      });
    }, 800);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section-container">
        <div className="section-header text-center">
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">Contact & Special Orders</h2>
          <div className="section-title-line"></div>
          <p className="section-subtitle">
            Have a question, large catering inquiry, or feedback? Send us a note or call us directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info-card">
            <h3 className="contact-info-title">Get in Touch with Roza</h3>
            <p className="contact-info-desc">
              We are located in the heart of Addis Ababa, always ready to serve you with warm Ethiopian hospitality.
            </p>

            <div className="contact-details-list">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <h4 className="contact-item-label">Address</h4>
                  <p className="contact-item-value">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div>
                  <h4 className="contact-item-label">Phone Numbers</h4>
                  {CONTACT_INFO.phones.map((phone, idx) => (
                    <p key={idx} className="contact-item-value">
                      <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div>
                  <h4 className="contact-item-label">Email</h4>
                  <p className="contact-item-value">
                    <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">🕒</div>
                <div>
                  <h4 className="contact-item-label">Operating Hours</h4>
                  <p className="contact-item-value">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>

            <div className="contact-socials-box">
              <span className="socials-label">Follow Us:</span>
              <div className="social-links">
                {CONTACT_INFO.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label={soc.name}
                  >
                    <span>{soc.icon}</span>
                    <span className="social-name">{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-card">
            <h3 className="form-card-title">Send Us a Message</h3>
            <p className="form-card-subtitle">Fill out the form below and our team will get back to you promptly.</p>

            <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
              <div className="form-field-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Abebe Bikila"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 911 ..."
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="interest" className="form-label">Interested In</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="Delivery Order">Regular Delivery Order</option>
                  <option value="Celebration Catering">Celebration / Wedding Catering</option>
                  <option value="Family Platters">Family Feast Platters</option>
                  <option value="Corporate Office Lunch">Corporate / Office Lunch</option>
                  <option value="Event Orders">Event & Party Orders</option>
                  <option value="General Feedback">General Feedback / Inquiry</option>
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="message" className="form-label">Your Message or Order Notes *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to order, preferred date/time, or questions..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-contact-btn"
                disabled={submitting}
              >
                {submitting ? 'Sending Request...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

