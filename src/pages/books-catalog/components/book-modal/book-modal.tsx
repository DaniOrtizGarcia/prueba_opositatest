import { useMemo } from 'react';
import { Book } from '../../interfaces/books.interface';
import { formatDate } from '../../../../utils/global-utils';
import { getBookCoverUrl } from '../../utils/books-utils';
import './book-modal.scss';
import { Button, ButtonTypes } from '../../../../components/button/button';

export interface BookModalProps {
  selectedBook: Book;
  favorites: string[];
  handleFavorite: (book: Book) => void;
  handleCloseBookModal: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ selectedBook, favorites, handleFavorite, handleCloseBookModal }) => {

  const isFavorite = favorites.includes(selectedBook.isbn);
  const favoriteIcon = isFavorite ? '★' : '☆';
  const favoriteColor = isFavorite ? 'gold' : 'black';
  const bookCoverUrl = useMemo(() => getBookCoverUrl(selectedBook.isbn), [selectedBook.isbn]);

  return (
    <div className='book-modal'>
      <img
        className='book-modal__image'
        src={bookCoverUrl}
        alt={selectedBook.name}
      />

      <div className='book-modal__information'>
        <Button type={ButtonTypes.CLOSEICON} text='X' onClick={handleCloseBookModal} />

        <div className='book-modal__information__header'>
          <h2 className='book-modal__information__header__title'>{selectedBook.name}</h2>

          <Button
            type={ButtonTypes.ONLYICON}
            text={favoriteIcon}
            onClick={() => handleFavorite(selectedBook)}
            colorText={favoriteColor}
          />
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
