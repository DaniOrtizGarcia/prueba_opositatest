import './books-catalog.scss';
import { BooksSearch } from './components/books-search/books-search';
import { BookCard } from './components/book-card/book-card';
import { Modal } from '../../components/modal/modal';
import { BookModal } from './components/book-modal/book-modal';
import { useBooksCatalog } from './hooks/use-books-catalog';
import { filterBooksByQuery } from './utils/books-utils';
import { Book } from './interfaces/books.interface';
import { Loader } from '../../components/loader/loader';
import { StatusMessage, StatusMessageType } from '../../components/status-message/status-message';
import { getErrorMessage } from '../../utils/global-utils';
import { BooksActions } from './components/books-actions/books-actions';

export const BooksCatalog = () => {
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
    handleShowRecentViewed,
    handleResetFilters,
    handleChangeSearchOption,
    searchOption
  } = useBooksCatalog();

  const filteredBooks = filterBooksByQuery(sortedBooks, searchQuery, searchOption);
  const booksLength = filteredBooks.length || 0;

  const isContentVisible = !isLoading && !error && booksLength > 0;
  const isBookListEmpty = !booksLength && !isLoading && !error;

  const fetchBooksErrorMessage = getErrorMessage(error);

  return (
    <div className='books-catalog'>
      <BooksSearch
        searchOption={searchOption}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleChangeSearchOption={handleChangeSearchOption}
      />

      {isLoading && <Loader />}

      {isContentVisible && (
        <div className="books-catalog__content">
          <BooksActions
            recentViewedBooks={recentViewedBooks}
            totalBooks={booksLength}
            handleSortBooks={handleSortBooks}
            isSorted={sortOrder}
            handleOpenBookModal={handleOpenBookModal}
            books={books}
            showRecentViewed={showRecentViewed}
            handleShowRecentViewed={handleShowRecentViewed}
            searchQuery={searchQuery}
            handleResetFilters={handleResetFilters}
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

      {error && !isLoading && <StatusMessage status={StatusMessageType.ERROR} message={fetchBooksErrorMessage} />}

      {isBookListEmpty && <StatusMessage status={StatusMessageType.INFO} message='No se han encontrado libros.' />}

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
