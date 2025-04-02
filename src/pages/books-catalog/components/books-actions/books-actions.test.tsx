import { render, screen, fireEvent } from '@testing-library/react';
import { BooksActions, BooksActionsProps } from './books-actions';
import { SortOrderType } from '../../interfaces/books.interface';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../../mocks/books-mock';

const mockRecentViewedBooks = new Set(['1234567890']);
const mockHandleSort = vi.fn();
const mockHandleOpenModal = vi.fn();
const mockHandleShowRecent = vi.fn();
const mockHandleReset = vi.fn();
const renderBooksActions = (props: BooksActionsProps) =>
  render(
    <BooksActions
      {...props}
    />
  );

describe('BooksActions', () => {
  it('renders total books count', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.NONE,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('Libros encontrados:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows sort button with correct text', () => {
    render(
      <BooksActions
        books={booksMock}
        totalBooks={2}
        recentViewedBooks={mockRecentViewedBooks}
        handleSortBooks={mockHandleSort}
        isSorted={SortOrderType.NONE}
        handleOpenBookModal={mockHandleOpenModal}
        showRecentViewed={false}
        handleShowRecentViewed={mockHandleShowRecent}
        searchQuery=""
        handleResetFilters={mockHandleReset}
      />
    );

    expect(screen.getByText('Ordenar Ascendente')).toBeInTheDocument();
  });

  it('changes sort button text when sorted', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.ASCENDING,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('Ordenar Descendente')).toBeInTheDocument();
  });

  it('disables recent viewed button when no recent books', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: new Set(),
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.NONE,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('Mostrar vistos recientemente')).toBeDisabled();
  });

  it('shows recent viewed books when expanded', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.NONE,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: true,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('The Great Book')).toBeInTheDocument();
    expect(screen.queryByText('Another Story')).not.toBeInTheDocument();
  });

  it('disables reset button when no filters applied', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.NONE,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('Limpiar filtros')).toBeDisabled();
  });

  it('enables reset button when filters applied', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.ASCENDING,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: 'test',
      handleResetFilters: mockHandleReset
    });

    expect(screen.getByText('Limpiar filtros')).toBeEnabled();
  });

  it('calls handlers when buttons clicked', () => {
    renderBooksActions({
      books: booksMock,
      totalBooks: 2,
      recentViewedBooks: mockRecentViewedBooks,
      handleSortBooks: mockHandleSort,
      isSorted: SortOrderType.NONE,
      handleOpenBookModal: mockHandleOpenModal,
      showRecentViewed: false,
      handleShowRecentViewed: mockHandleShowRecent,
      searchQuery: '',
      handleResetFilters: mockHandleReset
    });

    fireEvent.click(screen.getByText('Mostrar vistos recientemente'));
    fireEvent.click(screen.getByText('Ordenar Ascendente'));
    fireEvent.click(screen.getByText('Limpiar filtros'));

    expect(mockHandleShowRecent).toHaveBeenCalled();
    expect(mockHandleSort).toHaveBeenCalled();
  });
});
