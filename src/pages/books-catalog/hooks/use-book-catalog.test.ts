import { renderHook, act } from '@testing-library/react';
import { useBooksCatalog } from './use-books-catalog';
import { SortOrderType, SearchOptionsType } from '../interfaces/books.interface';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../mocks/books-mock';

vi.mock('./use-fetch-books', () => ({
  useFetchBooks: () => ({
    books: booksMock,
    isLoading: false,
    error: null
  })
}));

describe('useBooksCatalog', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.favorites).toEqual([]);
    expect(result.current.sortOrder).toBe(SortOrderType.NONE);
    expect(result.current.showRecentViewed).toBeFalsy();
    expect(result.current.searchOption).toBe(SearchOptionsType.BOOKS);
  });

  it('should handle search query changes', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {result.current.handleSearch('test query');});
    
    expect(result.current.searchQuery).toBe('test query');
  });

  it('should sort books in ascending order', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {result.current.handleSortBooks();});
    
    expect(result.current.sortOrder).toBe(SortOrderType.ASCENDING);
    expect(result.current.sortedBooks.map(b => b.name)).toEqual(['Another Story', 'The Great Book']);
  });

  it('should sort books in descending order when clicking twice', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {result.current.handleSortBooks();});
    act(() => {result.current.handleSortBooks();});
    
    expect(result.current.sortOrder).toBe(SortOrderType.DESCENDING);
    expect(result.current.sortedBooks.map(b => b.name)).toEqual(['The Great Book', 'Another Story']);
  });

  it('should toggle favorite books', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {result.current.handleFavorite(booksMock[0]);});
    
    expect(result.current.favorites).toEqual([booksMock[0].isbn]);
    
    act(() => {result.current.handleFavorite(booksMock[0]);});
    
    expect(result.current.favorites).toEqual([]);
  });

  it('should track recently viewed books', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {result.current.handleOpenBookModal(booksMock[1]);});
    
    expect(result.current.recentViewedBooks.has(booksMock[1].isbn)).toBeTruthy();
    expect(result.current.selectedBook).toEqual(booksMock[1]);
    
    act(() => {
      result.current.handleCloseBookModal();
    });
    
    expect(result.current.selectedBook).toBeNull();
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {
      result.current.handleSearch('test');
      result.current.handleSortBooks();
      result.current.handleResetFilters();
    });
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.sortOrder).toBe(SortOrderType.NONE);
  });

  it('should change search option', () => {
    const { result } = renderHook(() => useBooksCatalog());
    
    act(() => {
      result.current.handleChangeSearchOption(SearchOptionsType.ISBN);
    });
    
    expect(result.current.searchOption).toBe(SearchOptionsType.ISBN);
  });
});
