import styled from 'styled-components';
import {
  Book,
  getAverageRating,
  deleteBookAsync,
  getAllBooksAsync,
} from '../../../Data/BookData';
import TableData from './TableData';
import TableHeader from './TableHeader';
import { useEffect, useState } from 'react';
import { StyledWrapper, StyledButton, grey3, grey6 } from '../../Shared/styles';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const StyledTable = styled.table``;
const StyledTableThead = styled.thead``;
const StyledTableBody = styled.tbody``;
const StyledTableRow = styled.tr``;
const StyledTableDataEdit = styled.td``;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px 8px;
`;
const StyledDeleteButton = styled(StyledButton)`
  padding: 5px 8px;
`;

const StyledEditLink = styled(StyledLink)`
  color: blue;
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
const notifyToDeleteItem = () => {
  toast.success('Книга удалена', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

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
        setSortedBooks(sortedBooks.sort((a, b) => a.bookId - b.bookId));
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
        setSortedBooks(sortedBooks.sort((a, b) => a.pageNumber - b.pageNumber));
        break;
      case SortParams.PUBLISH:
        setSortedBooks(
          sortedBooks.sort((a, b) => a.publishYear - b.publishYear),
        );
        break;
      case SortParams.RATING:
        setSortedBooks(
          sortedBooks.sort(
            (a, b) => getAverageRating(a.ratings) - getAverageRating(b.ratings),
          ),
        );
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
        setSortedBooks(sortedBooks.sort((a, b) => b.bookId - a.bookId));
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
        setSortedBooks(sortedBooks.sort((a, b) => b.pageNumber - a.pageNumber));
        break;
      case SortParams.PUBLISH:
        setSortedBooks(
          sortedBooks.sort((a, b) => b.publishYear - a.publishYear),
        );
        break;
      case SortParams.RATING:
        setSortedBooks(
          sortedBooks.sort(
            (a, b) => getAverageRating(b.ratings) - getAverageRating(a.ratings),
          ),
        );
        break;
      case SortParams.PRICE:
        setSortedBooks(sortedBooks.sort((a, b) => b.price - a.price));
        break;
    }
  };
  const onDeleteItem = (bookId: number) => {
    const deleteAction = async () => {
      const result = await deleteBookAsync(bookId);
      if (result) {
        notifyToDeleteItem();
        const getUpdatedBookCollection = async () => {
          const bookResult = await getAllBooksAsync();
          if (bookResult) {
            setSortedBooks(() => bookResult);
          }
        };
        getUpdatedBookCollection();
      }
    };
    deleteAction();
  };
  return (
    <>
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
                  <TableData key={++counter} inform={book.bookId} />
                  <TableData key={++counter} inform={book.name} />
                  <TableData key={++counter} inform={book.genre} />
                  <TableData key={++counter} inform={book.pageNumber} />
                  <TableData key={++counter} inform={book.publishYear} />
                  <TableData
                    key={++counter}
                    inform={getAverageRating(book.ratings)}
                  />
                  <TableData key={++counter} inform={book.price} />
                  <StyledTableDataEdit>
                    <StyledWrapper>
                      <StyledEditLink to={`/edit/${book.bookId}`}>
                        Edit
                      </StyledEditLink>
                      <StyledDeleteButton
                        onClick={() => onDeleteItem(book.bookId)}
                      >
                        Delete
                      </StyledDeleteButton>
                    </StyledWrapper>
                  </StyledTableDataEdit>
                </StyledTableRow>
              );
            })}
          </StyledTableBody>
        </StyledTable>
        <StyledCreateLink to="/create">Add book</StyledCreateLink>
      </StyledWrapper>
      <ToastContainer />
    </>
  );
};
export default Table;
