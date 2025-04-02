import { render, screen, fireEvent } from '@testing-library/react';
import { BooksSearch, BooksSearchProps } from './books-search';
import { SearchOptionsType } from '../../interfaces/books.interface';
import { describe, it, expect, vi } from 'vitest';

const mockHandleSearch = vi.fn();
const mockHandleChangeOption = vi.fn();
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
    expect(screen.getByText('Libro')).toBeInTheDocument();
    expect(screen.getByText('Isbn')).toBeInTheDocument();
  });

  it('disables "Libro" button when books search is active', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(screen.getByText('Libro')).toBeDisabled();
    expect(screen.getByText('Isbn')).toBeEnabled();
  });

  it('disables "Isbn" button when ISBN search is active', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.ISBN,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    expect(screen.getByText('Isbn')).toBeDisabled();
    expect(screen.getByText('Libro')).toBeEnabled();
  });

  it('calls handleChangeSearchOption when button "Isbn" clicked', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.BOOKS,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    fireEvent.click(screen.getByText('Isbn'));

    expect(mockHandleChangeOption).toHaveBeenCalledWith(SearchOptionsType.ISBN);
  });

  it('calls handleChangeSearchOption when button "Libro" clicked', () => {
    renderBooksSearch({
      searchOption: SearchOptionsType.ISBN,
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleChangeSearchOption: mockHandleChangeOption
    });

    fireEvent.click(screen.getByText('Libro'));
    
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
