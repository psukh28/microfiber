import { describe, it, expect } from 'vitest';
import { 
  convertCurrency, 
  formatPrice, 
  convertAndFormatPrice,
  EXCHANGE_RATES,
  CURRENCY_SYMBOLS 
} from '../currency.js';

describe('Currency Utils', () => {
  describe('convertCurrency', () => {
    it('should convert THB to USD correctly', () => {
      const result = convertCurrency(100, 'USD');
      expect(result).toBe(2.7);
    });

    it('should convert THB to EUR correctly', () => {
      const result = convertCurrency(100, 'EUR');
      expect(result).toBe(2.5);
    });

    it('should return same value for THB to THB', () => {
      const result = convertCurrency(100, 'THB');
      expect(result).toBe(100);
    });

    it('should return 0 for null/undefined price', () => {
      expect(convertCurrency(null, 'USD')).toBe(0);
      expect(convertCurrency(undefined, 'USD')).toBe(0);
    });

    it('should throw error for unsupported currency', () => {
      expect(() => convertCurrency(100, 'GBP')).toThrow('Unsupported currency: GBP');
    });
  });

  describe('formatPrice', () => {
    it('should format THB without decimals', () => {
      const result = formatPrice(100, 'THB');
      expect(result).toBe('฿100');
    });

    it('should format USD with 2 decimals', () => {
      const result = formatPrice(2.7, 'USD');
      expect(result).toBe('$2.70');
    });

    it('should format EUR with 2 decimals', () => {
      const result = formatPrice(2.5, 'EUR');
      expect(result).toBe('€2.50');
    });

    it('should return fallback for null/undefined price', () => {
      expect(formatPrice(null, 'USD')).toBe('Request bulk quote');
      expect(formatPrice(undefined, 'USD')).toBe('Request bulk quote');
    });

    it('should throw error for unsupported currency', () => {
      expect(() => formatPrice(100, 'GBP')).toThrow('Unsupported currency: GBP');
    });
  });

  describe('convertAndFormatPrice', () => {
    it('should convert and format in one step', () => {
      const result = convertAndFormatPrice(100, 'USD');
      expect(result).toBe('$2.70');
    });

    it('should return fallback for null price', () => {
      const result = convertAndFormatPrice(null, 'USD');
      expect(result).toBe('Request bulk quote');
    });
  });
});