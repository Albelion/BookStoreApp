import { Page } from '../Shared/Page';
import BookListGrid from './BookGrid';
import { useState, useEffect } from 'react';
import { Book } from '../../Data/BookData';
import { getAllBooksAsync } from '../../Data/BookData';
import { useParams } from 'react-router-dom';
import PaginationSectionModern from '../Shared/PaginationSectionModern';
import paginationIndex from '../Shared/paginationIndex';

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
      setNumOfAllBooks(() => numBooks);
      if (!cancelled) {
        const IndexArray = paginationIndex(numBooks, currentPage, pageSize);
        setBooks(bookCollection.slice(IndexArray[0], IndexArray[1]));
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
          <PaginationSectionModern
            pageSize={pageSize}
            currentPage={currentPage ? Number(currentPage) : 1}
            numOfAllBooks={numOfAllBooks}
          />
        </>
      )}
    </Page>
  );
};
