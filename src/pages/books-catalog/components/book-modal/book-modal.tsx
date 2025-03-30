import { Book } from '../../interfaces/books.interface';
import './book-modal.scss';

interface BookModalProps {
  selectedBook: Book;
  favorites: string[];
  // eslint-disable-next-line no-unused-vars
  handleFavorite: (book: Book) => void;
  handleCloseBookModal: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ selectedBook, favorites, handleFavorite, handleCloseBookModal }) => {

  // Extraer función en un utils.ts
  const getUrlOfTheBookImage = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  return (
    <div className="book-modal">
      <img
        src={getUrlOfTheBookImage(selectedBook.isbn)}
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
          {favorites.includes(selectedBook.isbn) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        <button
          onClick={() => handleCloseBookModal()}
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
