import React from 'react';
import './NotFound.css';
import { AppContext } from '@src/AppContext';

export default function NotFound() {
  let { setCurrentPage } = React.useContext(AppContext);

  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-description">The page you are looking for does not exist.</p>
      <button className="not-found-link" onClick={() => {setCurrentPage('default')}}>Go to Home</button>
    </div>
  );
}