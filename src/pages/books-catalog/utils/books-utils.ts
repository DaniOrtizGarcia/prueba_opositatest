import { Books } from '../interfaces/books.interface';

export const getBookCoverUrl = (isbn: string): string =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

export const filterBooksByQuery = (books: Books, searchQuery: string): Books =>
  books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

export const formatDate = (date: string, separator: string): string => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDate();
  const month = formatedDate.getMonth() + 1;
  const year = formatedDate.getFullYear();

  return [day, month, year].join(separator);
};
