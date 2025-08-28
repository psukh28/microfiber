import { useState } from 'react';

const CURRENCIES = [
  { code: 'THB', label: 'Thai Baht', symbol: '฿' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' }
];

export default function CurrencySwitcher({ currency = 'THB', onCurrencyChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currencyCode) => {
    if (onCurrencyChange) {
      onCurrencyChange(currencyCode);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const currentCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      {/* Currency Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 min-h-[44px]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current currency: ${currentCurrency.label}. Click to change currency.`}
        id="currency-button"
      >
        <span className="text-lg" aria-hidden="true">{currentCurrency.symbol}</span>
        <span>{currentCurrency.code}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <div 
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20"
            role="menu"
            aria-labelledby="currency-button"
            aria-orientation="vertical"
          >
            <div className="py-1">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencySelect(curr.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:ring-inset transition-colors duration-150 min-h-[44px] ${
                    curr.code === currency 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  role="menuitem"
                  aria-current={curr.code === currency ? 'true' : 'false'}
                  aria-label={`Select ${curr.label} (${curr.code})`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg" aria-hidden="true">{curr.symbol}</span>
                      <div>
                        <div className="font-medium">{curr.code}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{curr.label}</div>
                      </div>
                    </div>
                    {curr.code === currency && (
                      <svg 
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}