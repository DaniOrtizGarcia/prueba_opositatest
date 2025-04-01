import React from 'react';
import { Book } from '../../interfaces/books.interface';
import { formatDate } from '../../../../utils/global-utils';
import { getBookCoverUrl } from '../../utils/books-utils';
import './book-modal.scss';

interface BookModalProps {
  selectedBook: Book;
  favorites: string[];
  handleFavorite: (book: Book) => void;
  handleCloseBookModal: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ selectedBook, favorites, handleFavorite, handleCloseBookModal }) => {

  const favoriteIcon = favorites.includes(selectedBook.isbn) ? '★' : '☆';

  return (
    <div className="book-modal">
      <img
        src={getBookCoverUrl(selectedBook.isbn)}
      />

      <div className='book-modal__information'>
        <button className='book-modal__information__close' onClick={() => handleCloseBookModal()}>
          X
        </button>

        <div className='book-modal__information__header'>
          <h2 className='book-modal__information__header__title'>{selectedBook.name}</h2>

          <button
            className='book-modal__information__header__favorite'
            onClick={() => handleFavorite(selectedBook)}
            style={{color: favorites.includes(selectedBook.isbn) ? 'gold' : 'black'}}
          >
            {favoriteIcon}
          </button>
        </div>

        <div className='book-modal__information__details'>
          <p className='book-modal__information__details__text'>
            <span className='book-modal__information__details__text__key'>Autor:</span>
            {selectedBook.authors.join(', ')}
          </p>
          <p className='book-modal__information__details__text'>
            <span className='book-modal__information__details__text__key'>Editorial:</span>
            {selectedBook.publisher}
          </p>
          <p className='book-modal__information__details__text'>
            <span className='book-modal__information__details__text__key'>ISBN:</span>
            {selectedBook.isbn}
          </p>
          <p className='book-modal__information__details__text'>
            <span className='book-modal__information__details__text__key'>Páginas:</span>
            {selectedBook.numberOfPages}
          </p>
          <p className='book-modal__information__details__text'>
            <span className='book-modal__information__details__text__key'>Año:</span>
            {formatDate(selectedBook.released, '/')}
          </p>
        </div>
      </div>
    </div>
  );
};
