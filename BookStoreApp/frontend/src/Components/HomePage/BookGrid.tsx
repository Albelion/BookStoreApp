import { Book } from '../../Data/BookData';
import styled from 'styled-components';
import { BookCardItem } from './BookCardItem';

interface StyledBookGridProps {
  numGrid: number;
}
const repeatWithFit = 'repeat(auto-fit, minmax(320px, 1fr))';
const repeatWithFill = 'repeat(auto-fill, minmax(320px, 1fr))';
const StyledBookGrid = styled.div<StyledBookGridProps>`
  display: grid;
  background-color: ${(props) => props.theme.bodyColor};
  //grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-column-gap: 1em;
  grid-template-columns: ${(props) =>
    props.numGrid < 3 ? repeatWithFill : repeatWithFit};
`;
interface BookGridProps {
  books: Book[];
}
const BookListGrid = ({ books }: BookGridProps) => {
  return (
    <StyledBookGrid numGrid={books.length}>
      {books.map((item) => (
        <BookCardItem key={item.id} book={item} />
      ))}
    </StyledBookGrid>
  );
};
export default BookListGrid;
