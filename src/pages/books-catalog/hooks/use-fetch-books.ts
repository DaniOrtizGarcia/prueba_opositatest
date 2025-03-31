import { useQuery } from '@tanstack/react-query';
import { Books } from '../interfaces/books.interface';
import { fetchBooks } from '../services/books-service';

const BOOKS_LIST_KEY = 'books_list';
const THIRTY_SECONDS = 30000;

export const useFetchBooks = () => {
  const { data: books = [], isLoading, error } = useQuery<Books, Error>({
    queryKey: [BOOKS_LIST_KEY],
    queryFn: fetchBooks,
    staleTime: THIRTY_SECONDS
  });

  return {
    books,
    isLoading,
    error
  };
};
