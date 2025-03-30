import React from 'react';
import './books-catalog.scss';
import { SearchBar } from '../../components/search-bar/search-bar';
import { BooksSearchActions } from './components/books-search-actions/books-search-actions';
import { BookCard } from './components/book-card/book-card';
import { Modal } from '../../components/modal/modal';
import { BookModal } from './components/book-modal/book-modal';
import { useBooksCatalog } from './hooks/use-books-catalog';
import { filterBooksByQuery } from './utils/books-utils';
import { Book } from './interfaces/books.interface';

export const BooksCatalog: React.FC = () => {
  const {
    books,
    isLoading,
    error,
    searchQuery,
    favorites,
    recentViewedBooks,
    selectedBook,
    isSorted,
    handleSearch,
    handleSortBooks,
    handleOpenBookModal,
    handleCloseBookModal,
    handleFavorite,
    getSortedBooks
  } = useBooksCatalog();

  return (
    <div className='books-catalog'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder={'Buscar libros'} />

      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="books-catalog__content">
          <BooksSearchActions
            recentViewedBooks={recentViewedBooks}
            totalBooks={filterBooksByQuery(books, searchQuery).length || 0}
            handleSortBooks={handleSortBooks}
            isSorted={isSorted}
            handleOpenBookModal={handleOpenBookModal}
            books={books}
          />

          <h3 className='books-catalog__content__subtitle'>Lista de libros</h3>
          <div className="books-catalog__content__list">
            {filterBooksByQuery(getSortedBooks, searchQuery).map((book: Book) => (
              <BookCard
                key={book.isbn}
                book={book}
                handleOpenBookModal={handleOpenBookModal}
                handleFavorite={handleFavorite}
                favorites={favorites}
              />
            ))}
          </div>
        </div>
      )}

      {selectedBook &&
        <Modal>
          <BookModal
            selectedBook={selectedBook}
            favorites={favorites}
            handleFavorite={handleFavorite}
            handleCloseBookModal={handleCloseBookModal} />
        </Modal>
      }
    </div>
  );
};
