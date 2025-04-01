import { Books, SeacrhOptionsType } from '../interfaces/books.interface';

export const getBookCoverUrl = (isbn: string): string =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

export const filterBooksByQuery = (books: Books, searchQuery: string, searchOption: string): Books => {
  if (searchOption === SeacrhOptionsType.ISBN) {
    return books.filter((book) => book.isbn.includes(searchQuery.toLowerCase()));
  }

  return books.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()));
};
