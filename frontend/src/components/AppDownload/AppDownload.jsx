import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => (
  <div className='app-download' id='app-download'>
    <div className="app-download-content">
      <div className="app-download-text">
        <p className="app-download-label">Mobile App</p>
        <h2>Order Faster with the Roza App</h2>
        <p>Get exclusive deals, real-time order tracking, and a seamless experience on your phone.</p>
        <div className="app-download-btns">
          <img src={assets.play_store} alt="Google Play" />
          <img src={assets.app_store} alt="App Store" />
        </div>
      </div>
      <div className="app-download-visual">
        <div className="app-download-phone">📱</div>
      </div>
    </div>
  </div>
);

export default AppDownload;
