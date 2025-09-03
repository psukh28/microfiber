// Currency symbols
export const CURRENCY_SYMBOLS = {
  THB: '฿',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$'
};

// Fallback exchange rates (used if API fails)
const FALLBACK_RATES = {
  THB: 1,
  USD: 0.027,
  EUR: 0.025,
  GBP: 0.022,
  JPY: 4.1,
  CNY: 0.20,
  INR: 2.3,
  AUD: 0.042,
  CAD: 0.037,
  SGD: 0.037
};

// Cache for exchange rates
let exchangeRatesCache = {
  rates: FALLBACK_RATES,
  lastUpdated: null,
  isLive: false
};

/**
 * Fetch live exchange rates from API
 * Using exchangerate-api.com (free tier: 1500 requests/month)
 */
async function fetchLiveRates() {
  try {
    // Using THB as base currency
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/THB');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Extract the currencies we need
    const liveRates = {
      THB: 1, // Base currency
      USD: data.rates.USD || FALLBACK_RATES.USD,
      EUR: data.rates.EUR || FALLBACK_RATES.EUR,
      GBP: data.rates.GBP || FALLBACK_RATES.GBP,
      JPY: data.rates.JPY || FALLBACK_RATES.JPY,
      CNY: data.rates.CNY || FALLBACK_RATES.CNY,
      INR: data.rates.INR || FALLBACK_RATES.INR,
      AUD: data.rates.AUD || FALLBACK_RATES.AUD,
      CAD: data.rates.CAD || FALLBACK_RATES.CAD,
      SGD: data.rates.SGD || FALLBACK_RATES.SGD
    };
    
    // Update cache
    exchangeRatesCache = {
      rates: liveRates,
      lastUpdated: new Date(),
      isLive: true
    };
    
    console.log('✅ Live exchange rates updated:', liveRates);
    return liveRates;
    
  } catch (error) {
    console.warn('⚠️ Failed to fetch live rates, using fallback:', error.message);
    
    // Update cache with fallback but mark as not live
    exchangeRatesCache = {
      rates: FALLBACK_RATES,
      lastUpdated: new Date(),
      isLive: false
    };
    
    return FALLBACK_RATES;
  }
}

/**
 * Get current exchange rates (cached or fetch new)
 */
export async function getExchangeRates() {
  const now = new Date();
  const cacheAge = exchangeRatesCache.lastUpdated 
    ? (now - exchangeRatesCache.lastUpdated) / (1000 * 60) // Age in minutes
    : Infinity;
  
  // Refresh rates if cache is older than 30 minutes or not live
  if (cacheAge > 30 || !exchangeRatesCache.isLive) {
    await fetchLiveRates();
  }
  
  return exchangeRatesCache.rates;
}

/**
 * Get cached exchange rates (synchronous)
 */
export function getCachedRates() {
  return exchangeRatesCache.rates;
}

/**
 * Check if rates are live or fallback
 */
export function areRatesLive() {
  return exchangeRatesCache.isLive;
}

/**
 * Convert price from THB to target currency
 * @param {number} priceThb - Price in Thai Baht
 * @param {string} targetCurrency - Target currency code (THB, USD, EUR)
 * @returns {number} Converted price
 */
export function convertCurrency(priceThb, targetCurrency = 'THB') {
  if (!priceThb || typeof priceThb !== 'number') {
    return 0;
  }
  
  const rates = getCachedRates();
  const rate = rates[targetCurrency];
  
  if (!rate) {
    throw new Error(`Unsupported currency: ${targetCurrency}`);
  }
  
  return priceThb * rate;
}

/**
 * Format price with currency symbol and appropriate decimal places
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (THB, USD, EUR)
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'THB') {
  if (!price || typeof price !== 'number') {
    return 'Container quote';
  }
  
  const symbol = CURRENCY_SYMBOLS[currency];
  if (!symbol) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  
  // Different currencies have different decimal conventions
  const decimals = (() => {
    switch (currency) {
      case 'JPY': // Japanese Yen doesn't use decimals
        return 0;
      case 'THB':
      case 'INR':
      case 'CNY':
      default:
        return 2; // THB, USD, EUR, GBP, AUD, CAD, SGD, INR, CNY all use 2 decimals
    }
  })();
  
  // Format with proper number formatting
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(price);
  
  return `${symbol}${formattedNumber}`;
}

/**
 * Convert and format price in one step
 * @param {number} priceThb - Price in Thai Baht
 * @param {string} targetCurrency - Target currency code
 * @returns {string} Formatted converted price
 */
export function convertAndFormatPrice(priceThb, targetCurrency = 'THB') {
  if (!priceThb || typeof priceThb !== 'number') {
    return 'Container quote';
  }
  
  const convertedPrice = convertCurrency(priceThb, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency);
}

/**
 * Initialize exchange rates on app start
 */
export function initializeCurrency() {
  // Fetch rates in background, don't wait for it
  getExchangeRates().catch(error => {
    console.warn('Failed to initialize live exchange rates:', error.message);
  });
}