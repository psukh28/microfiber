// Currency conversion constants
export const EXCHANGE_RATES = {
  THB: 1,
  USD: 0.027,
  EUR: 0.025
};

export const CURRENCY_SYMBOLS = {
  THB: '฿',
  USD: '$',
  EUR: '€'
};

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
  
  const rate = EXCHANGE_RATES[targetCurrency];
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
    return 'Request bulk quote';
  }
  
  const symbol = CURRENCY_SYMBOLS[currency];
  if (!symbol) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  
  // THB typically doesn't use decimals, USD/EUR use 2 decimals
  const decimals = currency === 'THB' ? 0 : 2;
  
  return `${symbol}${price.toFixed(decimals)}`;
}

/**
 * Convert and format price in one step
 * @param {number} priceThb - Price in Thai Baht
 * @param {string} targetCurrency - Target currency code
 * @returns {string} Formatted converted price
 */
export function convertAndFormatPrice(priceThb, targetCurrency = 'THB') {
  if (!priceThb || typeof priceThb !== 'number') {
    return 'Request bulk quote';
  }
  
  const convertedPrice = convertCurrency(priceThb, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency);
}