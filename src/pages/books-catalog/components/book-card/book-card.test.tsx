import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard, BookCardProps } from './book-card';
import { describe, it, expect, vi } from 'vitest';
import { booksMock } from '../../../../mocks/books-mock';
import { getBookCoverUrl } from '../../utils/books-utils';

const mockHandleOpenBookModal = vi.fn();
const mockHandleFavorite = vi.fn();
const getBookCardViewMore = () => screen.getByText('ver más...');
const getBookCardFavorite = () => screen.getByText('☆');
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
    expect(getBookCardFavorite()).toBeInTheDocument();
    expect(getBookCardViewMore()).toBeInTheDocument();
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

    fireEvent.click(getBookCardFavorite());

    expect(mockHandleFavorite).toHaveBeenCalledWith(booksMock[0]);
  });

  it('should call handleOpenBookModal when "ver más" is clicked', () => {
    renderBookCard({
      book: booksMock[0],
      handleOpenBookModal: mockHandleOpenBookModal,
      handleFavorite: mockHandleFavorite,
      favorites: []
    });

    fireEvent.click(getBookCardViewMore());
    
    expect(mockHandleOpenBookModal).toHaveBeenCalledWith(booksMock[0]);
  });
});
