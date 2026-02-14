import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState({
    isAuthenticated: false,
    user: null,
  });


  return (
    <AppContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);