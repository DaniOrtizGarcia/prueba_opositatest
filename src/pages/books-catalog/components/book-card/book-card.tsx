import React from 'react';
import './book-card.scss';
import { Book } from '../../interfaces/books.interface';

interface BookCardProps {
  book: Book;
  // eslint-disable-next-line no-unused-vars
  handleOpenBookModal: (book: Book) => void;
  // eslint-disable-next-line no-unused-vars
  handleFavorite: (book: Book) => void;
  favorites: string[];
}

const BookCard: React.FC<BookCardProps> = ({ book, handleOpenBookModal, handleFavorite, favorites }) => {

  const getUrlOfTheBookImage = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  return (
    <div className='book-card'>
      <img
        className='book-card__image'
        alt={book.name}
        src={getUrlOfTheBookImage(book.isbn)}
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
          {favorites.includes(book.isbn) ? '★' : '☆'}
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

export default BookCard;
