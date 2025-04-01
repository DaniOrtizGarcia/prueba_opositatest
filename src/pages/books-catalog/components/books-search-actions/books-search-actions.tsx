import React, { useMemo } from 'react';
import { Book, Books, SortOrderType } from '../../interfaces/books.interface';
import './books-search-actions.scss';

interface BooksSearchActionsProps {
  recentViewedBooks: Set<string>;
  totalBooks: number;
  handleSortBooks: () => void;
  isSorted: SortOrderType;
  handleOpenBookModal: (book: Book) => void;
  books: Books;
  showRecentViewed: boolean;
  handleShowRecentViewed: () => void;
  searchQuery: string;
  handleResetFilters: () => void;
}

export const BooksSearchActions: React.FC<BooksSearchActionsProps> = (
  { 
    recentViewedBooks, totalBooks, handleSortBooks, isSorted, handleOpenBookModal,
    books, showRecentViewed, handleShowRecentViewed, searchQuery, handleResetFilters
  }
) => {

  const recentViewedBooksList = useMemo(
    (): Books => books.filter((book: Book) => recentViewedBooks.has(book.isbn)),
    [books, recentViewedBooks]
  );

  const sortButtonText = isSorted === SortOrderType.Ascending ? 'Ordenar Descendente' : 'Ordenar Ascendente';

  const showRecentViewsText = showRecentViewed ? 'Ocultar vistos recientemente' : 'Mostrar vistos recientemente';
  const haveRecentViewedBooks = recentViewedBooksList.length;

  const isDisableResetButton = isSorted === SortOrderType.None && !searchQuery;

  return (
    <div className="books-search-actions">
      <div className='books-search-actions__bar'>
        <p className='books-search-actions__bar__total'>
          <span className='books-search-actions__total__text'>Libros encontrados:</span> {totalBooks}
        </p>

        <div className='books-search-actions__bar__actions'>
          <button
            className='books-search-actions__bar__actions__button'
            onClick={handleShowRecentViewed}
            disabled={!haveRecentViewedBooks}>
            {showRecentViewsText}
          </button>

          <button className='books-search-actions__bar__actions__button' onClick={handleSortBooks}>
            {sortButtonText}
          </button>

          <button
            className='books-search-actions__bar__actions__button'
            onClick={handleResetFilters}
            disabled={isDisableResetButton}
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <div
        className='books-search-actions__recent-viewed'
        style={{
          maxHeight: showRecentViewed ? '50px' : 0,
          padding: showRecentViewed ? '12px 0' : 0      
        }}
      >
        {recentViewedBooksList.map((book: Book) => (
          <button
            key={book.isbn}
            className='books-search-actions__recent-viewed__book-name'
            onClick={() => handleOpenBookModal(book)}
          >
            {book.name}
          </button>
        ))}
      </div>
    </div>
  );
};
