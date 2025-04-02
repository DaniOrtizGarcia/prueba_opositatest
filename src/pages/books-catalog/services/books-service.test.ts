import { describe, it, expect, vi } from 'vitest';
import { fetchBooks } from './books-service';
import { booksMock } from '../../../mocks/books-mock';

describe('fetchBooks', () => {
  it('should return parsed books when API call succeeds', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(booksMock)
    };

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await fetchBooks();
    
    expect(result).toEqual(booksMock);
  });

  it('should throw error when API call fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    await expect(fetchBooks()).rejects.toThrow('Error al solicitar los libros.');
  });
});
