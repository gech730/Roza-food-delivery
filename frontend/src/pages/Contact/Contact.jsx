import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>አድራሻችን (Contact Us)</h1>
        <p>ለማንኛውም ጥያቄ ወይም አስተያየት ያነጋግሩን (Get in touch with us for any inquiries)</p>
      </div>

      <div className="contact-container">
        {/* Contact Info Box */}
        <div className="contact-info">
          <h2>ከኛ ጋር ይገናኙ</h2>
          <p>ሮዛ ፈጣን ምግብ ማድረሻ አገልግሎት - תמיד በخدمትዎ (Always at your service)</p>
          
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h3>አድራሻ (Address)</h3>
              <p>ቦሌ መንገድ፣ አዲስ አበባ፣ ኢትዮጵያ</p>
              <p>Bole Road, Addis Ababa, Ethiopia</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h3>ስልክ (Phone)</h3>
              <p>+251 911 23 45 67</p>
              <p>+251 116 12 34 56</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h3>ኢሜይል (Email)</h3>
              <p>info@rozafood.com</p>
              <p>support@rozafood.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">🕒</span>
            <div>
              <h3>የስራ ሰዓት (Working Hours)</h3>
              <p>ሰኞ - እሁድ (Mon-Sun): 12:00 LT - 4:00 LT</p>
            </div>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="contact-form">
          <h2>መልዕክት ይላኩልን</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('መልዕክትዎ ተልኳል! እናመሰግናለን (Message Sent! Thank you)'); }}>
            <div className="form-group">
              <label>ሙሉ ስም (Full Name)</label>
              <input type="text" placeholder="ስምዎን ያስገቡ..." required />
            </div>
            
            <div className="form-group">
              <label>ኢሜይል (Email Address)</label>
              <input type="email" placeholder="ኢሜይልዎን ያስገቡ..." required />
            </div>
            
            <div className="form-group">
              <label>ጉዳዩ (Subject)</label>
              <input type="text" placeholder="የመልዕክቱን ርዕስ..." required />
            </div>
            
            <div className="form-group">
              <label>መልዕክት (Message)</label>
              <textarea rows="5" placeholder="መልዕክትዎን እዚህ ይፃፉ..." required></textarea>
            </div>
            
            <button type="submit" className="submit-btn">ላክ (Send Message)</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
