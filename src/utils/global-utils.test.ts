import { describe, it, expect } from 'vitest';
import { formatDate, getErrorMessage } from './global-utils';

describe('formatDate function', () => {
  it('should format date correctly', () => {
    expect(formatDate('2023-12-25', '/')).toBe('25/12/2023');
    expect(formatDate('2023-01-05', '-')).toBe('5-1-2023');
  });
});

describe('getErrorMessage function', () => {
  it('should return error message from Error object', () => {
    const error = new Error('Test error');
    
    expect(getErrorMessage(error)).toBe('Test error');
  });

  it('should return error message if string is provided', () => {
    expect(getErrorMessage(new Error('Custom error message'))).toBe('Custom error message');
  });

  it('should return default error message for null input', () => {
    expect(getErrorMessage(null)).toBe('Error en la llamada');
  });
});
