import React from 'react';
import './Loader.css';

export default function Loader({ className = '' }) {
  return (
    <div className={`loader-overlay ${className}`}>
      <div className="loader-spinner" />
    </div>
  );
}
