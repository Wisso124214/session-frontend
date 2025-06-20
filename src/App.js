import React from 'react';
import './App.css';
// import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import { AppContext } from './AppContext';
import PopUpMessage from './components/popUpMessage/PopUpMessage';
import axios from 'axios';
import config from './config/config.js';

const { BACKEND_URL, FRONTEND_URL } = config;

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

  React.useEffect(() => {
    (async () => {
      await axios.post(`${BACKEND_URL}/info`, {
        info: JSON.stringify({ FRONTEND_URL }),
      })
      .catch(error => {
        console.error('Error sending info to backend:', error);
      });
    })()
  }, []);

  return (
    <div className="app">
      {/* <Header setType={setType} allTypes={allTypes} type={type} /> */}
      <Navigation pages={pages} currentPage={consumeContext.currentPage === 'default' ? 'Register' : consumeContext.currentPage} />
      <PopUpMessage />
    </div>
  );
}

export default App;