import { render, screen, fireEvent } from '@testing-library/react';
import { BookModal, BookModalProps } from './book-modal';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../../mocks/books-mock';
import { getBookCoverUrl } from '../../utils/books-utils';

const mockHandleFavorite = vi.fn();
const mockHandleClose = vi.fn();
const renderBookModal = (props: BookModalProps) =>
  render(
    <BookModal
      {...props}
    />
  );

describe('BookModal', () => {
  it('renders book information correctly', () => {
    const bookCoverUrl = getBookCoverUrl(booksMock[0].isbn);
    renderBookModal({
      selectedBook: booksMock[0],
      favorites: [],
      handleFavorite: mockHandleFavorite,
      handleCloseBookModal: mockHandleClose
    });

    expect(screen.getByAltText('The Great Book')).toHaveAttribute('src', bookCoverUrl);
    expect(screen.getByText('The Great Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('Fiction House')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
    expect(screen.getByText('1/1/2020')).toBeInTheDocument();
  });

  it('shows filled star when book is favorite', () => {
    renderBookModal({
      selectedBook: booksMock[0],
      favorites: ['1234567890'],
      handleFavorite: mockHandleFavorite,
      handleCloseBookModal: mockHandleClose
    });

    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('calls handleFavorite when star is clicked', () => {
    renderBookModal({
      selectedBook: booksMock[0],
      favorites: [],
      handleFavorite: mockHandleFavorite,
      handleCloseBookModal: mockHandleClose
    });

    fireEvent.click(screen.getByText('☆'));

    expect(mockHandleFavorite).toHaveBeenCalledWith(booksMock[0]);
  });

  it('calls handleCloseBookModal when close button is clicked', () => {
    renderBookModal({
      selectedBook: booksMock[0],
      favorites: [],
      handleFavorite: mockHandleFavorite,
      handleCloseBookModal: mockHandleClose
    });

    fireEvent.click(screen.getByText('X'));
    
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
