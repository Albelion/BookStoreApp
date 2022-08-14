//import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Page } from '../Shared/Page';
import { useSearchParams } from 'react-router-dom';
import BookGridList from '../HomePage/BookGrid';
import { Book } from '../../Data/BookData';
import { searchBooksAsync } from '../../Data/BookData';
import PaginationSectionModern from '../Shared/PaginationSectionModern';
import paginationIndex from '../Shared/paginationIndex';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [numOfAllBooks, setNumOfAllBooks] = useState(0);
  const pageSize = 3;
  const search = searchParams.get('criteria') || '';
  const page = searchParams.get('page') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const searchResults = await searchBooksAsync(criteria);
      const numBooks = searchResults ? searchResults.length : 0;
      setNumOfAllBooks(() => numBooks);
      if (!cancelled) {
        const indexArray = paginationIndex(numBooks, page, pageSize);
        setBooks(searchResults.slice(indexArray[0], indexArray[1]));
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
          : numOfAllBooks === 0
          ? `Для запроса "${search}" не найдено книг`
          : `Результаты поиска для "${search}"`
      }
    >
      {!booksLoading && (
        <>
          <BookGridList books={books} />
          <PaginationSectionModern
            pageSize={pageSize}
            currentPage={page ? Number(page) : 1}
            numOfAllBooks={numOfAllBooks}
            search={search}
          />
        </>
      )}
    </Page>
  );
};
export default SearchPage;
