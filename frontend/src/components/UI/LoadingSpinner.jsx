import React from 'react';
import './UI.css';

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="ui-loading">
    <div className="ui-spinner" />
    {text && <p>{text}</p>}
  </div>
);

export default LoadingSpinner;
