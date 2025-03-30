import { useEffect, useState } from 'react';
import { Book, Books } from '../interfaces/books.interface';

export const useBooksCatalog = () => {
  const [books, setBooks] = useState<Books>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentViewedBooks, setRecentViewedBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(false);

  useEffect(() => {
    initBooks();
  }, []);

  // Fetch books from API
  const initBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://anapioficeandfire.com/api/books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  const handleSortBooks = () => {
    const sortedBooks = [...books].sort((a, b) => {
      const order = isSortedAsc ? -1 : 1;
      return order * a.name.localeCompare(b.name);
    });
    setBooks(sortedBooks);
    setIsSortedAsc(!isSortedAsc);
  };

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
    loading,
    error,
    searchQuery,
    favorites,
    recentViewedBooks,
    selectedBook,
    isSortedAsc,
    handleSearch,
    handleSortBooks,
    handleOpenBookModal,
    handleCloseBookModal,
    handleFavorite,
  };
};
