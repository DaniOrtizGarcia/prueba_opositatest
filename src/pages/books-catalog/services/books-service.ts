import { get } from '../../../infrastructure/http-client';
import { ApiBook, Book, Books } from '../interfaces/books.interface';

const BOOKS_LIST_API_URL = 'https://anapioficeandfire.com/api/books';

export const fetchBooks = async (): Promise<Books> => {
  try {
    const response = await get(BOOKS_LIST_API_URL);
    const data = await response.json();
    return data.map(apiBooksParser);
  } catch {
    throw new Error('Error al solicitar los libros.');
  }
};

const apiBooksParser = (response: ApiBook): Book => {
  return {
    url: response.url,
    name: response.name,
    isbn: response.isbn,
    authors: response.authors,
    numberOfPages: response.numberOfPages,
    publisher: response.publisher,
    country: response.country,
    mediaType: response.mediaType,
    released: response.released,
    characters: response.characters,
    povCharacters: response.povCharacters
  };
};
