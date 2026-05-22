/**
 * Formats a number as INR currency (₹)
 * @param amount - The numerical amount to format
 * @returns A formatted currency string
 */
export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount) || amount === 0) return '₹ —';
  return '₹ ' + Math.round(amount).toLocaleString('en-IN');
};
