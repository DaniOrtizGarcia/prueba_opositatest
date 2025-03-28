import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import './books-catalog.scss';
import { Book, Books } from './interfaces/books.interface';
import SearchBar from '../../components/search-bar/search-bar';
import BooksSearchActions from './components/books-search-actions/books-search-actions';

const BooksCatalog: React.FC = () => {
  const [libros, setLibros] = useState<Books>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentViewBooks, setRecentViewBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(false);
  const [sortedBooks, setSortedBooks] = useState<Books>([]);

  useEffect(() => {
    initBooks();
  }, []);

  // Obtenemos los libros
  const initBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://anapioficeandfire.com/api/books');
      const data = await response.json();
      setLibros(data);
      setError(null);
    } catch {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const booksData = () => {
    return lodash.filter(libros, (b: Book) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    );
  };

  const sortedBooksData = () => {
    return lodash.filter(sortedBooks, (b: Book) =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery))
    );
  };

  // Sort the books by name
  const handleSort = () => {
    const sortedBooks = libros.sort((a, b) => {
      if (isSortedAsc) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setSortedBooks(sortedBooks as Books);
    setIsSortedAsc(!isSortedAsc); // Cambiar la dirección del orden
  };

  // Presiona un libro
  const handleBook = (bk: Book) => {
    setSelectedBook(bk);
    setRecentViewBooks((prev) => new Set(prev).add(bk.url));
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

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  return (
    <div className='books-catalog'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder={'Buscar libro'} />

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="books-catalog__content">
          <BooksSearchActions
            recentViewBooks={recentViewBooks}
            totalBooks={booksData().length}
            handleSort={handleSort}
            isSortedAsc={isSortedAsc}
            handleBook={handleBook}
            libros={libros}
          />

          <h3>Lista de libros</h3>
          <div className="books-catalog">
            {sortedBooks.length > 0 ? sortedBooksData().map((book: Book, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                />
                <button
                  onClick={() => handleBook(book)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                >
                  {book.name}
                </button>
                <button
                  onClick={() => handleFavorite(book)}
                  style={{
                    backgroundColor: favorites.has(book.url) ? 'gold' : '#ddd',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {favorites.has(book.url) ? '★' : '☆'}
                </button>
              </div>
            )) : booksData().map((book: Book, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                />
                <button
                  onClick={() => handleBook(book)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                >
                  {book.name}
                </button>
                <button
                  onClick={() => handleFavorite(book)}
                  style={{
                    backgroundColor: favorites.has(book.url) ? 'gold' : '#ddd',
                    padding: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {favorites.has(book.url) ? '★' : '☆'}
                </button>
              </div>
            ))}

          </div>
        </div>
      )}

      {selectedBook && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={`https://covers.openlibrary.org/b/isbn/${selectedBook.isbn}-M.jpg`}
          />
          <h2>{selectedBook.name}</h2>
          <p><strong>Autor:</strong> {selectedBook.authors.join(', ')}</p>
          <p><strong>Editorial:</strong> {selectedBook.publisher}</p>
          <p><strong>Páginas:</strong> {selectedBook.numberOfPages}</p>
          <p><strong>Año:</strong> {selectedBook.released}</p>
          <button
            onClick={() => handleFavorite(selectedBook)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            {favorites.has(selectedBook.url) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
          <button
            onClick={() => setSelectedBook(null)}
            style={{
              backgroundColor: '#ccc',
              padding: '10px',
              cursor: 'pointer',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Cerrar
          </button>
          <button
            onClick={() => window.open(selectedBook.url, '_blank')}
            style={{ backgroundColor: '#02874a', color: 'white', padding: '10px', cursor: 'pointer' }}
          >
            Abrir API en el navegador
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksCatalog;
