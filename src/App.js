import React from 'react';
import './App.css';
// import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import { AppContext } from './AppContext';

/**
 * 
 * Types of notes:
 *  - square: shows titles and content (default)
 *  - titles: only shows titles and details (date, characters)
 *  - all
 */

function App() {
  let consumeContext = React.useContext(AppContext);
  const pages = [
    'ListNotes',
    'Register',
    'Login',
    'NotFound',
  ];

  return (
    <div className="app">
      {/* <Header setType={setType} allTypes={allTypes} type={type} /> */}
      <Navigation pages={pages} currentPage={consumeContext.currentPage === 'default' ? 'Register' : consumeContext.currentPage} />
    </div>
  );
}

export default App;