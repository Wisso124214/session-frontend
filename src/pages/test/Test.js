import React from 'react';
import './Test.css';

export default function Test() {
  return (
    <div className="test">
      <h1 className="test-title">Test Page</h1>
      <p className="test-description">This is a test page to demonstrate the structure of a React component.</p>
      <button className="test-button" onClick={() => alert('Button clicked!')}>Click Me!</button>
    </div>
  );
}