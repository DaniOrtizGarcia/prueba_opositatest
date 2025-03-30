import { Book } from '../../interfaces/books.interface';
import './book-modal.scss';

interface BookModalProps {
  selectedBook: Book;
  favorites: Set<string>;
  // eslint-disable-next-line no-unused-vars
  handleFavorite: (book: Book) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedBook: (book: Book | null) => void;
}

const BookModal: React.FC<BookModalProps> = ({ selectedBook, favorites, handleFavorite, setSelectedBook }) => {
  return (
    <div className="book-modal">
      <img
        src={`https://covers.openlibrary.org/b/isbn/${selectedBook.isbn}-M.jpg`}
      />

      <div className='book-modal__information'>
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
    </div>
  );
};

export default BookModal;
