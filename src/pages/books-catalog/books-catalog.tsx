import './books-catalog.scss';
import { SearchBar } from '../../components/search-bar/search-bar';
import { BooksSearchActions } from './components/books-search-actions/books-search-actions';
import { BookCard } from './components/book-card/book-card';
import { Modal } from '../../components/modal/modal';
import { BookModal } from './components/book-modal/book-modal';
import { useBooksCatalog } from './hooks/use-books-catalog';
import { filterBooksByQuery } from './utils/books-utils';
import { Book, SeacrhOptionsType } from './interfaces/books.interface';
import { Loader } from '../../components/loader/loader';
import { StatusMessage, StatusMessageType } from '../../components/status-message/status-message';
import { getErrorMessage } from '../../utils/global-utils';

const INPUT_PLACEHOLDER_BOOKS = 'Buscar libros';
const NOT_FOUND_BOOKS_TEXT = 'No se han encontrado libros.';

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

  const loadingBooksErrorMessage = getErrorMessage(error);

  const isDisabledSearchBooksButton = searchOption === SeacrhOptionsType.BOOKS;
  const isDisabledSearchIsbnButton = searchOption === SeacrhOptionsType.ISBN;

  return (
    <div className='books-catalog'>
      <div className='books-catalog__search-options'>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder={INPUT_PLACEHOLDER_BOOKS} />

        <button
          className='books-catalog__search-options__button'
          onClick={() => handleChangeSearchOption(SeacrhOptionsType.BOOKS)}
          disabled={isDisabledSearchBooksButton}
        >
          Libro
        </button>
        <button
          className='books-catalog__search-options__button'
          onClick={() => handleChangeSearchOption(SeacrhOptionsType.ISBN)}
          disabled={isDisabledSearchIsbnButton}
        >
          Isbn
        </button>
      </div>

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

      {error && !isLoading && <StatusMessage status={StatusMessageType.ERROR} message={loadingBooksErrorMessage} />}

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
