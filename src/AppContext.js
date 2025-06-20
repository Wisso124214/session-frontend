import React from 'react';
import App from './App';

export const AppContext = React.createContext();

function AppContextProvider() {
  const [currentPage, setCurrentPage] = React.useState('Login');
  const [popUpMessage, setPopUpMessage] = React.useState({
    isVisible: false,
    content: '',
    buttonText: 'Close',
    onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
  });

  let context = {
    currentPage,
    setCurrentPage,
    popUpMessage,
    setPopUpMessage
  }

  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
}

export default AppContextProvider;
