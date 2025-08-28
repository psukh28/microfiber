import { describe, it, expect } from 'vitest';
import { 
  isEmpty, 
  safeDisplay, 
  safeJoin, 
  validateProduct,
  isValidEmail,
  validateRFQForm 
} from '../validation.js';

describe('Validation Utils', () => {
  describe('isEmpty', () => {
    it('should return true for null, undefined, empty string', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
    });

    it('should return false for valid values', () => {
      expect(isEmpty('test')).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('safeDisplay', () => {
    it('should return fallback for empty values', () => {
      expect(safeDisplay(null)).toBe('Not specified');
      expect(safeDisplay(null, 'Custom fallback')).toBe('Custom fallback');
    });

    it('should return string value for valid input', () => {
      expect(safeDisplay('test')).toBe('test');
      expect(safeDisplay(123)).toBe('123');
    });
  });

  describe('safeJoin', () => {
    it('should join array values', () => {
      expect(safeJoin(['a', 'b', 'c'])).toBe('a, b, c');
      expect(safeJoin(['a', 'b'], ' | ')).toBe('a | b');
    });

    it('should return fallback for empty/invalid arrays', () => {
      expect(safeJoin([])).toBe('Not specified');
      expect(safeJoin(null)).toBe('Not specified');
    });
  });
});