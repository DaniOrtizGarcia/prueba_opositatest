import React from 'react';
import './book-card.scss';
import { Book } from '../../interfaces/books.interface';
import { getBookCoverUrl } from '../../utils/books-utils';

interface BookCardProps {
  book: Book;
  handleOpenBookModal: (book: Book) => void;
  handleFavorite: (book: Book) => void;
  favorites: string[];
}

export const BookCard: React.FC<BookCardProps> = ({ book, handleOpenBookModal, handleFavorite, favorites }) => {

  const favoriteIcon = favorites.includes(book.isbn) ? '★' : '☆';

  return (
    <div className='book-card'>
      <img
        className='book-card__image'
        alt={book.name}
        src={getBookCoverUrl(book.isbn)}
      />
      <div className='book-card__details'>
        <div className='book-card__details__header'>
          <h3
            className='book-card__details__header__name'
            title={book.name}
          >
            {book.name}
          </h3>

          <p className='book-card__details__header__author' title={book.authors.join(', ')}>
            {book.authors.join(', ')}
          </p>
        </div>

        <button
          className='book-card__details__favorite'
          onClick={() => handleFavorite(book)}
          style={{color: favorites.includes(book.isbn) ? 'gold' : 'black'}}
        >
          {favoriteIcon}
        </button>
      </div>

      <button
        className='book-card__view-more'
        onClick={() => handleOpenBookModal(book)}
      >
        ver más...
      </button>
    </div>
  );
};
