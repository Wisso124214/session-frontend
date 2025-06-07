import React from 'react';
import App from './App';

export const AppContext = React.createContext();

function AppContextProvider() {
  const [currentPage, setCurrentPage] = React.useState('Login');
  let context = {
    currentPage,
    setCurrentPage,
  }

  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
}

export default AppContextProvider;
