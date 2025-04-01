import { useMemo, useState } from 'react';
import { Book, Books, SearchOptionsType, SortOrderType } from '../interfaces/books.interface';
import { useFetchBooks } from './use-fetch-books';

const ASCENDING = -1;
const DESCENDING = 1;

export const useBooksCatalog = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentViewedBooks, setRecentViewedBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrderType>(SortOrderType.NONE);
  const [showRecentViewed, setShowRecentViewed] = useState<boolean>(false);
  const [searchOption, setSearchOption] = useState<SearchOptionsType>(SearchOptionsType.BOOKS);

  const {
    books,
    isLoading,
    error
  } = useFetchBooks();

  const handleSearch = (searchValue: string): void => {
    setSearchQuery(searchValue);
  };

  const handleSortBooks = (): void => {
    const changedSortOrder = sortOrder === SortOrderType.ASCENDING ? 
      SortOrderType.DESCENDING : SortOrderType.ASCENDING;
    setSortOrder(
      changedSortOrder
    );
  };

  const sortedBooks = useMemo((): Books => {
    if (sortOrder === SortOrderType.NONE) {
      return books;
    }

    return [...books].sort((a, b) => {
      const order = sortOrder === SortOrderType.DESCENDING ? ASCENDING : DESCENDING;
      return order * a.name.localeCompare(b.name);
    });
  }, [books, sortOrder]);

  const handleOpenBookModal = (selectedBook: Book): void => {
    setSelectedBook(selectedBook);
    setRecentViewedBooks((prev) => new Set([...prev, selectedBook.isbn]));
  };

  const handleCloseBookModal = (): void => {
    setSelectedBook(null);
  };

  const handleFavorite = (book: Book): void => {
    const isBookAlreadyMarkedAsFav = favorites.includes(book.isbn);

    if (isBookAlreadyMarkedAsFav) {
      setFavorites((prev) => prev.filter((isbn) => isbn !== book.isbn));
      return;
    }

    setFavorites((prev) => [...prev, book.isbn]);
  };

  const handleShowRecentViewed = (): void => {
    setShowRecentViewed((prev) => !prev);
  };

  const handleResetFilters = (): void => {
    setSortOrder(SortOrderType.NONE);
    setSearchQuery('');
  };

  const handleChangeSearchOption = (changedSearchOption: SearchOptionsType): void => {
    setSearchOption(changedSearchOption);
  };

  return {
    books,
    isLoading,
    error,
    searchQuery,
    favorites,
    recentViewedBooks,
    selectedBook,
    sortOrder,
    handleSearch,
    handleSortBooks,
    handleOpenBookModal,
    handleCloseBookModal,
    handleFavorite,
    sortedBooks,
    showRecentViewed,
    handleShowRecentViewed,
    handleResetFilters,
    handleChangeSearchOption,
    searchOption
  };
};
