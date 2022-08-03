import { Book } from '../../Data/BookData';
import styled from 'styled-components';
import { BookCardItem } from './BookCardItem';

const StyledBookGrid = styled.div`
  display: grid;
  background-color: ${(props) => props.theme.bodyColor};
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-column-gap: 1em;
`;
interface BookGridProps {
  books: Book[];
}
export const BookListGrid = ({ books }: BookGridProps) => {
  return (
    <StyledBookGrid>
      {books.map((item) => (
        <BookCardItem key={item.id} book={item} />
      ))}
    </StyledBookGrid>
  );
};
