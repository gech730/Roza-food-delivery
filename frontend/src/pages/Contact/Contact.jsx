import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact us</h1>
        <p>Reach out for questions, catering, or feedback—we are glad to help.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Roza fast delivery—always here when you need a great meal.</p>

          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>Bole Road, Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>+251 911 23 45 67</p>
              <p>+251 116 12 34 56</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>info@rozafood.com</p>
              <p>support@rozafood.com</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">🕒</span>
            <div>
              <h3>Hours</h3>
              <p>Monday – Sunday: 12:00 – 16:00 (local)</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send a message</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent. Thank you!'); }}>
            <div className="form-group">
              <label>Full name</label>
              <input type="text" placeholder="Your name" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="What is this about?" required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Write your message here..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">Send message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
