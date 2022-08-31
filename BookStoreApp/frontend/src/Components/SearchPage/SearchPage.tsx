//import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Page } from '../Shared/Page';
import { useSearchParams } from 'react-router-dom';
import BookGridList from '../HomePage/BookGrid';
import { getBookListView, BookListView } from '../../Data/BookData';
import PaginationSectionModern from '../Shared/PaginationSectionModern';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [bookListView, setbookListView] = useState<BookListView | null>(null);
  const [booksLoading, setBooksLoading] = useState(true);
  const search = searchParams.get('criteria') || '';
  const page = searchParams.get('page') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const searchResults = await getBookListView(
        criteria,
        page ? Number(page) : 1,
      );
      if (!cancelled && searchResults) {
        setbookListView(searchResults);
        setBooksLoading(false);
      }
    };
    doSearch(search);
    return () => {
      cancelled = true;
    };
  }, [search, page]);
  return (
    <Page
      title={
        booksLoading
          ? 'Загрузка...'
          : bookListView
          ? `Для запроса "${search}" не найдено книг`
          : `Результаты поиска для "${search}"`
      }
    >
      {!booksLoading && (
        <>
          <BookGridList books={bookListView!.bookList} />
          <PaginationSectionModern
            pageSize={bookListView!.pageInfo.pageSize}
            currentPage={page ? Number(page) : 1}
            numOfAllBooks={bookListView!.pageInfo.totalItems}
            search={search}
          />
        </>
      )}
    </Page>
  );
};
export default SearchPage;
