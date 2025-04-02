import { render, screen, fireEvent } from '@testing-library/react';
import { BooksSearch, BooksSearchProps } from './books-search';
import { SearchOptionsType } from '../../interfaces/books.interface';
import { describe, it, expect, vi } from 'vitest';

const mockHandleSearch = vi.fn();
const mockHandleChangeOption = vi.fn();
const getBooksSearchButtonBook = () => screen.getByText('Libro');
const getBooksSearchButtonIsbn = () => screen.getByText('Isbn');
const renderBooksSearch = (props: BooksSearchProps) =>
  render(
    <BooksSearch
      {...props}
    />
  );

describe('BooksSearch', () => {
  it('renders search bar and buttons', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(screen.getByPlaceholderText('Buscar libros')).toBeInTheDocument();
    expect(getBooksSearchButtonBook()).toBeInTheDocument();
    expect(getBooksSearchButtonIsbn()).toBeInTheDocument();
  });

  it('disables "Libro" button when books search is active', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(getBooksSearchButtonBook()).toBeDisabled();
    expect(getBooksSearchButtonIsbn()).toBeEnabled();
  });

  it('disables "Isbn" button when ISBN search is active', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.ISBN,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(getBooksSearchButtonIsbn()).toBeDisabled();
    expect(getBooksSearchButtonBook()).toBeEnabled();
  });

  it('calls handleChangeSearchOption when button "Isbn" clicked', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    fireEvent.click(getBooksSearchButtonIsbn());

    expect(mockHandleChangeOption).toHaveBeenCalledWith(SearchOptionsType.ISBN);
  });

  it('calls handleChangeSearchOption when button "Libro" clicked', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.ISBN,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    fireEvent.click(getBooksSearchButtonBook());
    
    expect(mockHandleChangeOption).toHaveBeenCalledWith(SearchOptionsType.BOOKS);
  });

  it('passes search query to SearchBar', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: 'test query',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });
});
