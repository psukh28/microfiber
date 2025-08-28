import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children, initialCurrency = 'THB' }) {
  const [currency, setCurrency] = useState(initialCurrency);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const value = {
    currency,
    changeCurrency
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