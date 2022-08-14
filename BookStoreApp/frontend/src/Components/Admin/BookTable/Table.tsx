import styled from 'styled-components';
import { Book } from '../../../Data/BookData';
import TableData from './TableData';
import TableHeader from './TableHeader';
import { useEffect, useState } from 'react';
import { StyledWrapper } from '../../Shared/styles';
import { Link } from 'react-router-dom';
import { grey3, grey6 } from '../../Shared/styles';

const StyledTable = styled.table``;
const StyledTableThead = styled.thead``;
const StyledTableBody = styled.tbody``;
const StyledTableRow = styled.tr``;
const StyledTableDataEdit = styled.td``;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px 8px;
`;

const StyledEditLink = styled(StyledLink)`
  color: blue;
`;
const StyledDeleteLink = styled(StyledLink)`
  color: red;
`;
const StyledCreateLink = styled(StyledLink)`
  margin-top: 20px;
  background-color: ${(props) =>
    (props.theme.nameOfTheme = 'light' ? grey6 : grey3)};
  color: ${(props) => props.theme.fontColorPrimary};
`;

export enum SortParams {
  BOOKID,
  NAME,
  GENRE,
  NUMPAGE,
  PUBLISH,
  RATING,
  PRICE,
}

interface TableProps {
  books: Book[];
}

const Table = ({ books }: TableProps) => {
  const [isActiveSort, setIsActiveSort] = useState({
    SortArray: Array(books.length).fill(false),
    isAsc: true,
  });
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  useEffect(() => {
    setSortedBooks(() => books);
  }, [books]);

  const SortParamsArray: SortParams[] = [
    SortParams.BOOKID,
    SortParams.NAME,
    SortParams.GENRE,
    SortParams.NUMPAGE,
    SortParams.PUBLISH,
    SortParams.RATING,
    SortParams.PRICE,
  ];
  const onSortedUp = (param: SortParams) => {
    setIsActiveSort({
      SortArray: isActiveSort.SortArray.map((x, i) =>
        i === Number(param) ? true : false,
      ),
      isAsc: true,
    });
    switch (param) {
      case SortParams.BOOKID:
        setSortedBooks(sortedBooks.sort((a, b) => a.id - b.id));
        break;
      case SortParams.NAME:
        setSortedBooks(sortedBooks.sort((a, b) => (a.name > b.name ? -1 : 1)));
        break;
      case SortParams.GENRE:
        setSortedBooks(
          sortedBooks.sort((a, b) => (a.genre > b.genre ? -1 : 1)),
        );
        break;
      case SortParams.NUMPAGE:
        setSortedBooks(
          sortedBooks.sort((a, b) => a.numberPages - b.numberPages),
        );
        break;
      case SortParams.PUBLISH:
        setSortedBooks(
          sortedBooks.sort((a, b) => a.publishYear - b.publishYear),
        );
        break;
      case SortParams.RATING:
        setSortedBooks(sortedBooks.sort((a, b) => a.rating - b.rating));
        break;
      case SortParams.PRICE:
        setSortedBooks(sortedBooks.sort((a, b) => a.price - b.price));
        break;
    }
  };
  const onSortedDown = (param: SortParams) => {
    setIsActiveSort({
      SortArray: isActiveSort.SortArray.map((x, i) =>
        i === Number(param) ? true : false,
      ),
      isAsc: false,
    });
    switch (param) {
      case SortParams.BOOKID:
        setSortedBooks(sortedBooks.sort((a, b) => b.id - a.id));
        break;
      case SortParams.NAME:
        setSortedBooks(sortedBooks.sort((a, b) => (b.name > a.name ? -1 : 1)));
        break;
      case SortParams.GENRE:
        setSortedBooks(
          sortedBooks.sort((a, b) => (b.genre > a.genre ? -1 : 1)),
        );
        break;
      case SortParams.NUMPAGE:
        setSortedBooks(
          sortedBooks.sort((a, b) => b.numberPages - a.numberPages),
        );
        break;
      case SortParams.PUBLISH:
        setSortedBooks(
          sortedBooks.sort((a, b) => b.publishYear - a.publishYear),
        );
        break;
      case SortParams.RATING:
        setSortedBooks(sortedBooks.sort((a, b) => b.rating - a.rating));
        break;
      case SortParams.PRICE:
        setSortedBooks(sortedBooks.sort((a, b) => b.price - a.price));
        break;
    }
  };
  return (
    <StyledWrapper flexDirection="column" alignItems="start">
      <StyledTable>
        <StyledTableThead>
          <StyledTableRow>
            {SortParamsArray.map((x, i) => {
              return (
                <TableHeader
                  key={i}
                  onSortedUp={onSortedUp}
                  onSortedDown={onSortedDown}
                  sortParams={x}
                  isVisible={isActiveSort.SortArray[i]}
                  isUpSort={isActiveSort.isAsc}
                ></TableHeader>
              );
            })}
          </StyledTableRow>
        </StyledTableThead>
        <StyledTableBody>
          {sortedBooks.map((book, i) => {
            let counter = sortedBooks.length * i;
            return (
              <StyledTableRow>
                <TableData key={++counter} inform={book.id} />
                <TableData key={++counter} inform={book.name} />
                <TableData key={++counter} inform={book.genre} />
                <TableData key={++counter} inform={book.numberPages} />
                <TableData key={++counter} inform={book.publishYear} />
                <TableData key={++counter} inform={book.rating} />
                <TableData key={++counter} inform={book.price} />
                <StyledTableDataEdit>
                  <StyledWrapper>
                    <StyledEditLink to={`/edit/${book.id}`}>
                      Edit
                    </StyledEditLink>
                    <StyledDeleteLink to={`/delete/${book.id}`}>
                      Delete
                    </StyledDeleteLink>
                  </StyledWrapper>
                </StyledTableDataEdit>
              </StyledTableRow>
            );
          })}
        </StyledTableBody>
      </StyledTable>
      <StyledCreateLink to="/create">Add book</StyledCreateLink>
    </StyledWrapper>
  );
};
export default Table;
