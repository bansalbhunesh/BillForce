import { formatCurrency } from './format';
import { describe, it, expect } from 'vitest';

describe('formatCurrency', () => {
  it('formats numbers to Indian Rupee format correctly', () => {
    expect(formatCurrency(840000)).toBe('₹ 8,40,000');
    expect(formatCurrency(1200000)).toBe('₹ 12,00,000');
  });

  it('rounds decimal numbers', () => {
    expect(formatCurrency(1234.56)).toBe('₹ 1,235');
  });

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('₹ —');
  });

  it('handles null or undefined safely', () => {
    expect(formatCurrency(null)).toBe('₹ —');
    expect(formatCurrency(undefined)).toBe('₹ —');
  });
});
