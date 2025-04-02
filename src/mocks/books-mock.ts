import { Books } from '../pages/books-catalog/interfaces/books.interface';

export const booksMock: Books = [
  {
    url: 'https://example.com/book1',
    name: 'The Great Book',
    isbn: '1234567890',
    authors: ['Author One'],
    numberOfPages: 300,
    publisher: 'Fiction House',
    country: 'USA',
    mediaType: 'Hardcover',
    released: '2020-01-01',
    characters: ['Character A'],
    povCharacters: ['Character B'],
  },
  {
    url: 'https://example.com/book2',
    name: 'Another Story',
    isbn: '0987654321',
    authors: ['Author Two'],
    numberOfPages: 250,
    publisher: 'Story Press',
    country: 'UK',
    mediaType: 'Paperback',
    released: '2019-05-15',
    characters: ['Character C'],
    povCharacters: ['Character D'],
  },
];
