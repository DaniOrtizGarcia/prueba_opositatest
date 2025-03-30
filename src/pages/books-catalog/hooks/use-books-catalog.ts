import { useMemo, useState } from 'react';
import { Book, SortOrder } from '../interfaces/books.interface';
import { useFetchBooks } from './use-fetch-books';

export const useBooksCatalog = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentViewedBooks, setRecentViewedBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSorted, setIsSorted] = useState<SortOrder>(SortOrder.None);

  const {
    books,
    isLoading,
    isError
  } = useFetchBooks();

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  const handleSortBooks = () => {
    setIsSorted(isSorted === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending);
  };

  const getSortedBooks = useMemo(() => 
    isSorted === SortOrder.None ? books : [...books].sort((a, b) => {
      const order = isSorted === SortOrder.Descending ? -1 : 1;
      return order * a.name.localeCompare(b.name);
    }), [books, isSorted]);

  const handleOpenBookModal = (selectedBook: Book) => {
    setSelectedBook(selectedBook);
    setRecentViewedBooks((prev) => new Set([...prev, selectedBook.isbn]));
  };

  const handleCloseBookModal = () => {
    setSelectedBook(null);
  };

  const handleFavorite = (book: Book) => {
    const isBookAlreadyMarkedAsFav = favorites.includes(book.isbn);

    if (isBookAlreadyMarkedAsFav) {
      setFavorites((prev) => prev.filter((isbn) => isbn !== book.isbn));
      return;
    }

    setFavorites((prev) => [...prev, book.isbn]);
  };

  return {
    books,
    isLoading,
    error: isError ? 'Error al buscar los libros' : null,
    searchQuery,
    favorites,
    recentViewedBooks,
    selectedBook,
    isSorted,
    handleSearch,
    handleSortBooks,
    handleOpenBookModal,
    handleCloseBookModal,
    handleFavorite,
    getSortedBooks
  };
};
