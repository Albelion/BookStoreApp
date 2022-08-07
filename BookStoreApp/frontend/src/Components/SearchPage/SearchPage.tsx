//import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Page } from '../Shared/Page';
import { useSearchParams } from 'react-router-dom';
import BookGridList from '../HomePage/BookGrid';
import { Book } from '../../Data/BookData';
import { searchBooksAsync } from '../../Data/BookData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);

  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const searchResults = await searchBooksAsync(criteria);
      if (!cancelled) {
        setBooks(searchResults);
      }
    };
    doSearch(search);
    return () => {
      cancelled = true;
    };
  }, [search]);
  return (
    <Page
      title={
        books.length > 0 ? `Результаты поиска для "${search}"` : 'Поиск...'
      }
    >
      <BookGridList books={books} />
    </Page>
  );
};
export default SearchPage;
