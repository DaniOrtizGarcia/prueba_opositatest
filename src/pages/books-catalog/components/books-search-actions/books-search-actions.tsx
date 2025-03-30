import React, { useCallback } from 'react';
import { Book, Books } from '../../interfaces/books.interface';
import './books-search-actions.scss';

interface BooksSearchActionsProps {
  recentViewedBooks: Set<string>;
  totalBooks: number;
  handleSortBooks: () => void;
  isSortedAsc: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpenBookModal: (book: Book) => void;
  books: Books;
}

const BooksSearchActions: React.FC<BooksSearchActionsProps> = (
  { recentViewedBooks, totalBooks, handleSortBooks, isSortedAsc, handleOpenBookModal, books }
) => {

  const getRecentViewedBooks = useCallback(
    () => books.filter((book: Book) => recentViewedBooks.has(book.isbn)), [recentViewedBooks]
  );

  return (
    <div className="books-search-actions">
      <p className='books-search-actions__total'>
        <span className='books-search-actions__total__text'>Libros encontrados:</span> {totalBooks}
      </p>

      <div className='books-search-actions__actions'>
        <div>
          <h3>Recientes</h3>
          {getRecentViewedBooks().map((book: Book) => {
            return (
              <button key={book.isbn} onClick={() => handleOpenBookModal(book)}>
                {book.name}
              </button>
            );
          })}
        </div>

        <button className='books-search-actions__actions__sort' onClick={handleSortBooks}>
          {isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
        </button>
      </div>
    </div>
  );
};

export default BooksSearchActions;
