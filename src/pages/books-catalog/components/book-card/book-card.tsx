import { useMemo } from 'react';
import './book-card.scss';
import { Book } from '../../interfaces/books.interface';
import { getBookCoverUrl } from '../../utils/books-utils';
import { Button, ButtonTypes } from '../../../../components/button/button';

interface BookCardProps {
  book: Book;
  handleOpenBookModal: (book: Book) => void;
  handleFavorite: (book: Book) => void;
  favorites: string[];
}

export const BookCard: React.FC<BookCardProps> = ({ book, handleOpenBookModal, handleFavorite, favorites }) => {

  const isFavorite = favorites.includes(book.isbn);
  const favoriteIcon = isFavorite ? '★' : '☆';
  const favoriteColor = isFavorite ? 'gold' : 'black';
  const authorsList = book.authors.join(', ');
  const bookCoverUrl = useMemo(() => getBookCoverUrl(book.isbn), [book.isbn]);

  return (
    <div className='book-card'>
      <img
        className='book-card__image'
        alt={book.name}
        src={bookCoverUrl}
      />
      <div className='book-card__details'>
        <div className='book-card__details__header'>
          <h3
            className='book-card__details__header__name'
            title={book.name}
          >
            {book.name}
          </h3>

          <p className='book-card__details__header__author' title={authorsList}>
            {authorsList}
          </p>
        </div>

        <Button
          type={ButtonTypes.ONLYICON}
          text={favoriteIcon}
          onClick={() => handleFavorite(book)}
          colorText={favoriteColor}
        />
      </div>

      <Button
        text='ver más...'
        type={ButtonTypes.LINK}
        onClick={() => handleOpenBookModal(book)}
      />
    </div>
  );
};
