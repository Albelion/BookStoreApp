import { Page } from '../Shared/Page';
import { useState, useEffect } from 'react';
import { getAllBooksAsync, Book } from '../../Data/BookData';
import Table from './BookTable/Table';

//create styled to the table

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const getBookCollection = async () => {
      const bookCollection = await getAllBooksAsync();
      if (!cancelled) {
        setBooksLoading(false);
        setBooks(bookCollection);
      }
    };
    getBookCollection();

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <Page title={booksLoading ? 'Download...' : 'Admin'}>
      {!booksLoading && <Table books={books} />}
    </Page>
  );
};
export default AdminPage;
