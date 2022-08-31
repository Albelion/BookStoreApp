import { Page } from '../Shared/Page';
import BookListGrid from './BookGrid';
import { useState, useEffect } from 'react';
import { getBookListView } from '../../Data/BookData';
import { useParams } from 'react-router-dom';
import PaginationSectionModern from '../Shared/PaginationSectionModern';
import { BookListView } from '../../Data/BookData';

export const HomePage = () => {
  const [bookListView, setBookListView] = useState<BookListView | null>(null);
  const [booksLoading, setBooksLoading] = useState(true);
  const { currentPage } = useParams();
  useEffect(() => {
    let cancelled = false;
    const getBookCollection = async () => {
      const bookCollection = await getBookListView(
        undefined,
        currentPage ? Number(currentPage) : 1,
      );
      if (!cancelled && bookCollection) {
        setBookListView(bookCollection);
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
          <BookListGrid books={bookListView!.bookList} />
          <PaginationSectionModern
            pageSize={bookListView!.pageInfo.pageSize}
            currentPage={currentPage ? Number(currentPage) : 1}
            numOfAllBooks={bookListView!.pageInfo.totalItems}
          />
        </>
      )}
    </Page>
  );
};
