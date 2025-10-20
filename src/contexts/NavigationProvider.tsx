import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationContextType {
  currentPage: string;
  handleChangePage: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleChangePage = (page: string) => {
    setCurrentPage(page);
  };

  const contextValue: NavigationContextType = {
    currentPage,
    handleChangePage,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
