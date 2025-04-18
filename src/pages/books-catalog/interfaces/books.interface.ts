export type Books = Book[];

export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}

export interface ApiBook {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}

export enum SortOrderType {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
  NONE = 'None',
}

export enum SearchOptionsType {
  BOOKS = 'books',
  ISBN = 'isbn'
}
