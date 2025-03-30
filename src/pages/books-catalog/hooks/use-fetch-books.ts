import { useQuery } from '@tanstack/react-query';
import { Books } from '../interfaces/books.interface';
import { fetchBooks } from '../services/books-service';

export const useFetchBooks = () => {
  const { data: books = [], isLoading, isError } = useQuery<Books, Error>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  return {
    books,
    isLoading,
    isError
  };
};
