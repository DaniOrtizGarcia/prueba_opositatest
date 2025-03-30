import { Books } from '../interfaces/books.interface';

/**
 * Fetches the list of books from the API.
 * @returns A promise that resolves to the list of books.
 */
export const fetchBooks = async (): Promise<Books> => {
  const response = await fetch('https://anapioficeandfire.com/api/books');
  if (!response.ok) {
    throw new Error('Error fetching books');
  }
  return response.json();
};
