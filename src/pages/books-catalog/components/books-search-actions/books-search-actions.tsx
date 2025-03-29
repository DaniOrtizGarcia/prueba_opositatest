import React from 'react';
import { Book } from '../../interfaces/books.interface';
import './books-search-actions.scss';

interface BooksSearchActionsProps {
  recentViewBooks: Set<string>;
  totalBooks: number;
  handleSort: () => void;
  isSortedAsc: boolean;
  // eslint-disable-next-line no-unused-vars
  handleBook: (book: Book) => void;
  libros: Book[];
}

const BooksSearchActions: React.FC<BooksSearchActionsProps> = (
  { recentViewBooks, totalBooks, handleSort, isSortedAsc, handleBook, libros }
) => {
  return (
    <div className="books-search-actions">
      <p className='books-search-actions__total'>
        <span className='books-search-actions__total__text'>Libros encontrados:</span> {totalBooks}
      </p>


      <div className='books-search-actions__actions'>
        {recentViewBooks.size > 0 && (
          <div>
            <h3>Recientes</h3>
            {Array.from(recentViewBooks).map((url) => {
              const book = libros.find((b) => b.url === url);
              return book ? (
                <button key={book.isbn} onClick={() => handleBook(book)}>
                  {book.name}
                </button>
              ) : null;
            })}
          </div>
        )}

        <button className='books-search-actions__actions__sort' onClick={handleSort}>
          {isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
        </button>
      </div>
    </div>
  );
};

export default BooksSearchActions;
