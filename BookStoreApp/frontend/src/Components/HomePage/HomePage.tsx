import { Page } from '../Shared/Page';
import BookListGrid from './BookGrid';
import { useState, useEffect } from 'react';
import { Book } from '../../Data/BookData';
import { getAllBooksAsync } from '../../Data/BookData';
import { useParams } from 'react-router-dom';
import PaginationSection from '../Shared/PaginationSection';

export const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [numOfAllBooks, setNumOfAllBooks] = useState(0);
  const { currentPage } = useParams();
  const pageSize = 3;
  useEffect(() => {
    let cancelled = false;
    const getBookCollection = async () => {
      const bookCollection = await getAllBooksAsync();
      const numBooks = bookCollection ? bookCollection.length : 0;
      setNumOfAllBooks(bookCollection ? bookCollection.length : 0);
      if (!cancelled) {
        const startIndex = currentPage
          ? (Number(currentPage) - 1) * pageSize
          : 0;
        const endIndex =
          numBooks - startIndex >= pageSize
            ? startIndex + pageSize
            : startIndex + (numBooks - startIndex);
        setBooks(bookCollection.slice(startIndex, endIndex));
        setBooksLoading(false);
      }
    };
    getBookCollection();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);
  return (
    <Page title={booksLoading ? 'Загрузка книг' : 'Каталог книг'}>
      {!booksLoading && (
        <>
          <BookListGrid books={books} />
          <PaginationSection
            pageSize={pageSize}
            currentPage={currentPage ? Number(currentPage) : 1}
            numOfAllBooks={numOfAllBooks}
          />
        </>
      )}
    </Page>
  );
};
