import React, { createContext, useContext, useState, useCallback } from 'react';

// Create context with default values
const StoreContext = createContext(null);

// Custom hook to use store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger data refresh
  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const value = {
    storeInfo,
    setStoreInfo,
    products,
    setProducts,
    loading,
    setLoading,
    error,
    setError,
    refreshTrigger,
    refreshData
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};