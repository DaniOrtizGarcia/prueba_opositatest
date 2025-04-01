import { Books } from '../interfaces/books.interface';

export const getBookCoverUrl = (isbn: string): string =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

export const filterBooksByQuery = (books: Books, searchQuery: string): Books =>
  books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
