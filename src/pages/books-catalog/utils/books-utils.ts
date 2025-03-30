import { Book } from '../interfaces/books.interface';

export const getBookCoverUrl = (isbn: string) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

export const filterBooksByQuery = (books: Book[], searchQuery: string): Book[] =>
  books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

