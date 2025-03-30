import { Book } from '../../interfaces/books.interface';
import { getBookCoverUrl } from '../../utils/books-utils';
import './book-modal.scss';

interface BookModalProps {
  selectedBook: Book;
  favorites: string[];
  handleFavorite: (book: Book) => void;
  handleCloseBookModal: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ selectedBook, favorites, handleFavorite, handleCloseBookModal }) => {

  const favoriteIcon = favorites.includes(selectedBook.isbn) ? '★' : '☆';

  return (
    <div className="book-modal">
      <img
        src={getBookCoverUrl(selectedBook.isbn)}
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
          {favoriteIcon}
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
      </div>
    </div>
  );
};
