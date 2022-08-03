import { Page } from '../Shared/Page';
import { BookList } from '../../Data/BookData';
import { BookListGrid } from './BookGrid';

export const HomePage = () => {
  return (
    <Page title="Каталог книг">
      <BookListGrid books={BookList} />
    </Page>
  );
};
