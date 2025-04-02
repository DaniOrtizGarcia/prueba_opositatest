import { describe, it, expect } from 'vitest';
import { getBookCoverUrl, filterBooksByQuery } from './books-utils';
import { SearchOptionsType } from '../interfaces/books.interface';
import { booksMock } from '../../../mocks/books-mock';

describe('getBookCoverUrl function', () => {
  it('should return correct cover URL for a given ISBN', () => {
    expect(getBookCoverUrl('1234567890')).toBe('https://covers.openlibrary.org/b/isbn/1234567890-M.jpg');
  });
});

describe('filterBooksByQuery function', () => {
  it('should filter books by ISBN', () => {
    const filteredBooks = filterBooksByQuery(booksMock, '123', SearchOptionsType.ISBN);

    expect(filteredBooks).toEqual([booksMock[0]]);
  });

  it('should filter books by name', () => {
    const filteredBooks = filterBooksByQuery(booksMock, 'great', SearchOptionsType.BOOKS);

    expect(filteredBooks).toEqual([booksMock[0]]);
  });

  it('should return an empty array if no books match', () => {
    const filteredBooks = filterBooksByQuery(booksMock, 'nonexistent', SearchOptionsType.BOOKS);
    
    expect(filteredBooks).toEqual([]);
  });
});
