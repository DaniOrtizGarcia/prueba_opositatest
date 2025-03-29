import React from 'react';
import './book-card.scss';
import { Book } from '../../interfaces/books.interface';

interface BookCardProps {
  book: Book;
  // eslint-disable-next-line no-unused-vars
  handleBook: (book: Book) => void;
  // eslint-disable-next-line no-unused-vars
  handleFavorite: (book: Book) => void;
  favorites: Set<string>;
}

const BookCard: React.FC<BookCardProps> = ({ book, handleBook, handleFavorite, favorites }) => {
  return (
    <div className='book-card'>
      <img
        className='book-card__image'
        alt={book.name}
        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
      />
      <button
        onClick={() => handleBook(book)}
        style={{ cursor: 'pointer', marginRight: '10px' }}
      >
        {book.name}
      </button>
      <button
        onClick={() => handleFavorite(book)}
        style={{
          backgroundColor: favorites.has(book.url) ? 'gold' : '#ddd',
          padding: '5px',
          cursor: 'pointer',
        }}
      >
        {favorites.has(book.url) ? '★' : '☆'}
      </button>
    </div>
  );
};

export default BookCard;
