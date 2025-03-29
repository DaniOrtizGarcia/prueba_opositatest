import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import './books-catalog.scss';
import { Book, Books } from './interfaces/books.interface';

const BooksCatalog: React.FC = () => {
  const [libros, setLibros] = useState<Books>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
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
        return a.name.localeCompare(b.name); // Orden ascendente
      } else {
        return b.name.localeCompare(a.name); // Orden descendente
      }
    });
    setSortedBooks(sortedBooks as Books);
    setIsSortedAsc(!isSortedAsc); // Cambiar la dirección del orden
  };

  // Presiona un libro
  const handleBook = (bk: Book) => {
    setSelectedBook(bk);
    setRecentBooks((prev) => new Set(prev).add(bk.url));
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
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar libro"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
            }}
          />
          <button
            onClick={initBooks}
            style={{
              padding: '10px',
              marginBottom: '20px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
            }}
          >
            Actualizar libros
          </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="body">
            <p><strong>Libros encontrados:</strong> {booksData().length}</p>

            <button style={{ marginBottom: '10px' }} onClick={handleSort}>{isSortedAsc ? 'Ordenar Descendente' : 'Ordenar Ascendente'}</button>

            {recentBooks.size > 0 && (
              <div>
                <h3>Recientes</h3>
                {Array.from(recentBooks).map((url) => {
                  const book = libros.find((b) => b.url === url);
                  return book ? (
                    <div style={{ marginBottom: '10px' }}>
                      <button onClick={() => handleBook(book)}>
                        {book.name}
                      </button>
                    </div>
                  ) : null;
                })}
                <h3>Lista de libros</h3>
              </div>
            )}

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
    </>
  );
};

export default BooksCatalog;
