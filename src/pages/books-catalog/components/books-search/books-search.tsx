import { SearchBar } from "../../../../components/search-bar/search-bar";
import { SeacrhOptionsType } from "../../interfaces/books.interface";
import './books-search.scss';

interface BooksSearchProps {
  searchOption: SeacrhOptionsType,
  searchQuery: string,
  handleSearch: (searchValue: string) => void,
  handleChangeSearchOption: (changedSearchOption: SeacrhOptionsType) => void
}

export const BooksSearch: React.FC<BooksSearchProps> = ({ searchOption, searchQuery, handleSearch, handleChangeSearchOption }) => {

  const isDisabledSearchBooksButton = searchOption === SeacrhOptionsType.BOOKS;
  const isDisabledSearchIsbnButton = searchOption === SeacrhOptionsType.ISBN;

  return (
    <div className='books-search'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder='Buscar libros' />

      <button
        className='books-search__button'
        onClick={() => handleChangeSearchOption(SeacrhOptionsType.BOOKS)}
        disabled={isDisabledSearchBooksButton}
      >
        Libro
      </button>
      <button
        className='books-search__button'
        onClick={() => handleChangeSearchOption(SeacrhOptionsType.ISBN)}
        disabled={isDisabledSearchIsbnButton}
      >
        Isbn
      </button>
    </div>
  );
};
