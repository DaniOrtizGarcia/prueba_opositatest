import { BooksCatalog } from './pages/books-catalog/books-catalog';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

export const App = () => {
  return (
    <>
      <Header />
      <BooksCatalog />
      <Footer />
    </>
  );
};
