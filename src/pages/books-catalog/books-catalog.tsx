import React from 'react';
import './books-catalog.scss';
import { SearchBar } from '../../components/search-bar/search-bar';
import { BooksSearchActions } from './components/books-search-actions/books-search-actions';
import { BookCard } from './components/book-card/book-card';
import { Modal } from '../../components/modal/modal';
import { BookModal } from './components/book-modal/book-modal';
import { useBooksCatalog } from './hooks/use-books-catalog';
import { filterBooksByQuery, getErrorMessage } from './utils/books-utils';
import { Book } from './interfaces/books.interface';
import { Loader } from '../../components/loader/loader';
import { StatusMessage, StatusMessageType } from '../../components/status-message/status-message';

const INPUT_PLACEHOLDER_BOOKS = 'Buscar libros';
const NOT_FOUND_BOOKS_TEXT = 'No se han encontrado libros.';

export const BooksCatalog: React.FC = () => {
  const {
    books,
    isLoading,
    error,
    searchQuery,
    favorites,
    recentViewedBooks,
    selectedBook,
    sortOrder,
    handleSearch,
    handleSortBooks,
    handleOpenBookModal,
    handleCloseBookModal,
    handleFavorite,
    sortedBooks,
    showRecentViewed,
    handleShowRecentViewed
  } = useBooksCatalog();

  const filteredBooks = filterBooksByQuery(sortedBooks, searchQuery);
  const booksLength = filteredBooks.length || 0;

  const isContentVisible = !isLoading && !error && booksLength > 0;
  const isBookListEmpty = !booksLength && !isLoading && !error;

  const loadingBooksError = getErrorMessage(error);

  return (
    <div className='books-catalog'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder={INPUT_PLACEHOLDER_BOOKS} />

      {isLoading && <Loader />}

      {isContentVisible && (
        <div className="books-catalog__content">
          <BooksSearchActions
            recentViewedBooks={recentViewedBooks}
            totalBooks={booksLength}
            handleSortBooks={handleSortBooks}
            isSorted={sortOrder}
            handleOpenBookModal={handleOpenBookModal}
            books={books}
            showRecentViewed={showRecentViewed}
            handleShowRecentViewed={handleShowRecentViewed}
          />

          <div className="books-catalog__content__list">
            {filteredBooks.map((book: Book) => (
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

      {error && !isLoading && <StatusMessage status={StatusMessageType.ERROR} message={loadingBooksError} />}

      {isBookListEmpty && <StatusMessage status={StatusMessageType.INFO} message={NOT_FOUND_BOOKS_TEXT} />}

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
