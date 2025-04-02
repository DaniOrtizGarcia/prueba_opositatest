import { renderHook, waitFor } from '@testing-library/react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useFetchBooks } from './use-fetch-books';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../mocks/books-mock';
import { Books } from '../interfaces/books.interface';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('../services/books-service', () => ({
  fetchBooks: vi.fn(),
}));

describe('useFetchBooks', () => {
  it('should return loading state initially', () => {
    (useQuery as jest.Mock<UseQueryResult<Books, Error>>).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as UseQueryResult<Books, Error>);

    const { result } = renderHook(() => useFetchBooks());
    
    expect(result.current).toEqual({
      books: [],
      isLoading: true,
      error: null,
    });
  });

  it('should return books data when query succeeds', async () => {
    (useQuery as jest.Mock<UseQueryResult<Books, Error>>).mockReturnValue({
      data: booksMock,
      isLoading: false,
      error: null,
    } as UseQueryResult<Books, Error>);

    const { result } = renderHook(() => useFetchBooks());
    
    await waitFor(() => {
      expect(result.current).toEqual({
        books: booksMock,
        isLoading: false,
        error: null,
      });
    });
  });

  it('should return error when query fails', async () => {
    const mockError = new Error('Failed to fetch books');

    (useQuery as jest.Mock<UseQueryResult<Books, Error>>).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
    } as UseQueryResult<Books, Error>);

    const { result } = renderHook(() => useFetchBooks());
    
    await waitFor(() => {
      expect(result.current).toEqual({
        books: [],
        isLoading: false,
        error: mockError,
      });
    });
  });

  it('should use correct query key and stale time', () => {
    renderHook(() => useFetchBooks());
    
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['books_list'],
      queryFn: expect.any(Function),
      staleTime: 30000,
    });
  });
});
