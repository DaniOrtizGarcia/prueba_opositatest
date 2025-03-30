import React, { useEffect, useState } from 'react';
import './books-catalog.scss';
import { Book, Books } from './interfaces/books.interface';
import SearchBar from '../../components/search-bar/search-bar';
import BooksSearchActions from './components/books-search-actions/books-search-actions';
import BookCard from './components/book-card/book-card';
import Modal from '../../components/modal/modal';
import BookModal from './components/book-modal/book-modal';

const BooksCatalog: React.FC = () => {
  const [books, setBooks] = useState<Books>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentViewedBooks, setRecentViewedBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(false);

  useEffect(() => {
    initBooks();
  }, []);

  // Obtenemos los libros
  const initBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://anapioficeandfire.com/api/books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  const filteredAndSortedBooks = books.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSortBooks = () => {
    const sortedBooks = [...books].sort((a, b) => {
      const order = isSortedAsc ? -1 : 1;
      return order * a.name.localeCompare(b.name);
    });
    setBooks(sortedBooks);
    setIsSortedAsc(!isSortedAsc);
  };

  const handleOpenBookModal = (selectedBook: Book) => {
    setSelectedBook(selectedBook);
    setRecentViewedBooks((prev) => new Set(prev).add(selectedBook.isbn));
  };

  // Press the favorites button
  const handleFavorite = (b: Book) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(b.url)) {
        newFavorites.delete(b.url);
      } else {
        newFavorites.add(b.url);
      }
      return newFavorites;
    });
  };

  return (
    <div className='books-catalog'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder={'Buscar libros'} />

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="books-catalog__content">
          <BooksSearchActions
            recentViewedBooks={recentViewedBooks}
            totalBooks={filteredAndSortedBooks.length}
            handleSortBooks={handleSortBooks}
            isSortedAsc={isSortedAsc}
            handleOpenBookModal={handleOpenBookModal}
            books={books}
          />

          <h3>Lista de libros</h3>
          <div className="books-catalog__content__list">
            {filteredAndSortedBooks.map((book: Book) => (
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
            setSelectedBook={setSelectedBook} />
        </Modal>
      }
    </div>
  );
};

export default BooksCatalog;
