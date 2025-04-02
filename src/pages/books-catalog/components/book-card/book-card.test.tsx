import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard, BookCardProps } from './book-card';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../../mocks/books-mock';
import { getBookCoverUrl } from '../../utils/books-utils';

const mockHandleOpenBookModal = vi.fn();
const mockHandleFavorite = vi.fn();
const renderBookCard = (props: BookCardProps) =>
  render(
    <BookCard
      {...props}
    />
  );

describe('BookCard', () => {
  it('should render book information correctly', () => {
    const bookCoverUrl = getBookCoverUrl(booksMock[0].isbn);
    renderBookCard({
      book: booksMock[0],
      handleOpenBookModal: mockHandleOpenBookModal,
      handleFavorite: mockHandleFavorite,
      favorites: []
    });

    expect(screen.getByText('The Great Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('☆')).toBeInTheDocument();
    expect(screen.getByText('ver más...')).toBeInTheDocument();
    expect(screen.getByAltText('The Great Book')).toHaveAttribute('src', bookCoverUrl);
  });

  it('should show filled star when book is favorite', () => {
    renderBookCard({
      book: booksMock[0],
      handleOpenBookModal: mockHandleOpenBookModal,
      handleFavorite: mockHandleFavorite,
      favorites: ['1234567890']
    });

    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('should call handleFavorite when star is clicked', () => {
    renderBookCard({
      book: booksMock[0],
      handleOpenBookModal: mockHandleOpenBookModal,
      handleFavorite: mockHandleFavorite,
      favorites: []
    });

    fireEvent.click(screen.getByText('☆'));

    expect(mockHandleFavorite).toHaveBeenCalledWith(booksMock[0]);
  });

  it('should call handleOpenBookModal when "ver más" is clicked', () => {
    render(
      <BookCard
        book={booksMock[0]}
        handleOpenBookModal={mockHandleOpenBookModal}
        handleFavorite={mockHandleFavorite}
        favorites={[]}
      />
    );

    fireEvent.click(screen.getByText('ver más...'));
    
    expect(mockHandleOpenBookModal).toHaveBeenCalledWith(booksMock[0]);
  });
});
