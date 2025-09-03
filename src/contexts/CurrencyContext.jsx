import { createContext, useContext, useState, useEffect } from 'react';
import { initializeCurrency, getExchangeRates, areRatesLive } from '../utils/currency.js';

const CurrencyContext = createContext();

export function CurrencyProvider({ children, initialCurrency = 'THB' }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const [ratesStatus, setRatesStatus] = useState({ isLive: false, lastUpdated: null });

  useEffect(() => {
    // Initialize currency rates on mount
    initializeCurrency();
    
    // Check rates status
    const checkRatesStatus = () => {
      setRatesStatus({
        isLive: areRatesLive(),
        lastUpdated: new Date()
      });
    };
    
    checkRatesStatus();
    
    // Update rates every 30 minutes
    const interval = setInterval(async () => {
      try {
        await getExchangeRates();
        checkRatesStatus();
      } catch (error) {
        console.warn('Failed to update exchange rates:', error.message);
      }
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const value = {
    currency,
    changeCurrency,
    ratesStatus
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}