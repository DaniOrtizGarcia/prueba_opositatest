import { useMemo } from 'react';
import { Book, Books, SortOrderType } from '../../interfaces/books.interface';
import './books-actions.scss';
import { Button, ButtonTypes } from '../../../../components/button/button';

interface BooksActionsProps {
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

export const BooksActions: React.FC<BooksActionsProps> = (
  { 
    recentViewedBooks, totalBooks, handleSortBooks, isSorted, handleOpenBookModal,
    books, showRecentViewed, handleShowRecentViewed, searchQuery, handleResetFilters
  }
) => {

  const recentViewedBooksList = useMemo(
    (): Books => books.filter((book: Book) => recentViewedBooks.has(book.isbn)),
    [books, recentViewedBooks]
  );

  const sortButtonText = isSorted === SortOrderType.ASCENDING ? 'Ordenar Descendente' : 'Ordenar Ascendente';

  const showRecentViewsText = showRecentViewed ? 'Ocultar vistos recientemente' : 'Mostrar vistos recientemente';
  const haveRecentViewedBooks = recentViewedBooksList.length;

  const isDisableResetButton = isSorted === SortOrderType.NONE && !searchQuery;

  return (
    <div className="books-actions">
      <div className='books-actions__bar'>
        <p className='books-actions__bar__total'>
          <span className='books-actions__total__text'>Libros encontrados:</span> {totalBooks}
        </p>

        <div className='books-actions__bar__actions'>
          <Button
            text={showRecentViewsText}
            onClick={handleShowRecentViewed}
            disabled={!haveRecentViewedBooks}
          />

          <Button
            text={sortButtonText}
            onClick={handleSortBooks}
          />

          <Button
            text='Limpiar filtros'
            onClick={handleResetFilters}
            disabled={isDisableResetButton}
          />
        </div>
      </div>

      <div
        className='books-actions__recent-viewed'
        style={{
          maxHeight: showRecentViewed ? '500px' : 0,
          padding: showRecentViewed ? '12px 0' : 0      
        }}
      >
        {recentViewedBooksList.map((book: Book) => (
          <Button
            key={book.isbn}
            type={ButtonTypes.LINK}
            text={book.name}
            onClick={() => handleOpenBookModal(book)}
          />
        ))}
      </div>
    </div>
  );
};
