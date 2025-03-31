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
}

export const BooksSearchActions: React.FC<BooksSearchActionsProps> = (
  { recentViewedBooks, totalBooks, handleSortBooks, isSorted, handleOpenBookModal, books }
) => {

  const recentViewedBooksList = useMemo(
    (): Books => books.filter((book: Book) => recentViewedBooks.has(book.isbn)),
    [books, recentViewedBooks]
  );

  const sortButtonText = isSorted === SortOrderType.Ascending ? 'Ordenar Descendente' : 'Ordenar Ascendente';

  return (
    <div className="books-search-actions">
      <p className='books-search-actions__total'>
        <span className='books-search-actions__total__text'>Libros encontrados:</span> {totalBooks}
      </p>

      <div className='books-search-actions__actions'>
        <div>
          <h3>Recientes</h3>
          {recentViewedBooksList.map((book: Book) => (
            <button key={book.isbn} onClick={() => handleOpenBookModal(book)}>
              {book.name}
            </button>
          ))}
        </div>

        <button className='books-search-actions__actions__sort' onClick={handleSortBooks}>
          {sortButtonText}
        </button>
      </div>
    </div>
  );
};
