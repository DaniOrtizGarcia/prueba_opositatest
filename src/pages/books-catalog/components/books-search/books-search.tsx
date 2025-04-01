import { Button } from "../../../../components/button/button";
import { SearchBar } from "../../../../components/search-bar/search-bar";
import { SearchOptionsType } from "../../interfaces/books.interface";
import './books-search.scss';

interface BooksSearchProps {
  searchOption: SearchOptionsType,
  searchQuery: string,
  handleSearch: (searchValue: string) => void,
  handleChangeSearchOption: (changedSearchOption: SearchOptionsType) => void
}

export const BooksSearch: React.FC<BooksSearchProps> = ({ searchOption, searchQuery, handleSearch, handleChangeSearchOption }) => {

  const isDisabledSearchBooksButton = searchOption === SearchOptionsType.BOOKS;
  const isDisabledSearchIsbnButton = searchOption === SearchOptionsType.ISBN;

  return (
    <div className='books-search'>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} inputPlaceholder='Buscar libros' />

      <Button
        text='Libro'
        onClick={() => handleChangeSearchOption(SearchOptionsType.BOOKS)}
        disabled={isDisabledSearchBooksButton}
      />
      <Button
        text='Isbn'
        onClick={() => handleChangeSearchOption(SearchOptionsType.ISBN)}
        disabled={isDisabledSearchIsbnButton}
      />
    </div>
  );
};
