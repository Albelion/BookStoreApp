import { Page } from '../Shared/Page';
import styled from 'styled-components';
import { Book } from '../../Data/BookData';
import { BookList } from '../../Data/BookData';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StyledWrapper, StyledContainer } from '../Shared/styles';
import StarRatingWithState from '../HomePage/StarRatingWithState';
import NoImage from '../../BookImages/noimage.jpg';
import { TiStarFullOutline } from 'react-icons/ti';
import { grey6, grey1 } from '../Shared/styles';

interface BooksLoadingState {
  readonly loading: boolean;
  readonly viewing: Book | null;
}
export interface AppState {
  readonly books: BooksLoadingState;
}

const StyledImageDetailsWrapper = styled.img`
  width: 25%;
  border-radius: 0;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  height: 80%;
  alt: 'Book';
  align-self: center;
  border-radius: 5%;
  object-fit: cover;
`;

const StyledBookDescriptionPanel = styled(StyledContainer)`
  font-size: 1.5rem;
  text-align: start;
`;

const BookTitleStyled = styled.h1`
  text-align: start;
`;
const BookAutorStyled = styled.div`
  text-align: start;
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const StyledBookInformationDetails = styled(StyledContainer)`
  color: ${(props) => (props.theme.bodyColor === '#fff' ? grey6 : grey1)};
`;
const StyledLabel = styled.div`
  text-align: start;
  font-size: 2rem;
  font-weight: bold;
`;

export const DetailsPage = () => {
  //get booksId from parameters
  const { bookId } = useParams();
  //set loading false
  const [foundedBook, setFoundBook] = useState<Book | null>(null);

  useEffect(() => {
    let cancelled: boolean = false;
    const getBook = async (bookId: number) => {
      await new Promise((r) => setTimeout(r, 1000));
      const findingBook = BookList.find((book) => book.id === bookId);
      const foundBook = findingBook ? findingBook : null;
      if (!cancelled) {
        setFoundBook(foundBook);
      }
    };
    if (bookId) {
      getBook(Number(bookId));
    }
    return () => {
      cancelled = true;
    };
  }, [bookId]);
  return (
    <Page title={foundedBook ? 'Информация о книге' : 'Поиск'}>
      {foundedBook !== null && (
        <>
          <StyledWrapper
            gap="50px"
            justifyContent="start"
            alignItems="top"
            padding="0px 20px"
          >
            <StyledImageDetailsWrapper
              src={foundedBook.src === 'noImage' ? NoImage : foundedBook.src}
            />
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              gap="30px"
            >
              <StyledContainer>
                <BookTitleStyled>{foundedBook.name}</BookTitleStyled>
                <BookAutorStyled>
                  {foundedBook.autors.map((autor) => autor.name) + ' '}
                </BookAutorStyled>
              </StyledContainer>
              <StyledWrapper justifyContent="start" gap="15px">
                <StyledWrapper>
                  <StyledContainer>{foundedBook.rating}</StyledContainer>
                  <TiStarFullOutline color="#ffc107" size="20px" />
                </StyledWrapper>
                <StyledWrapper>
                  <StyledContainer>Моя оценка: </StyledContainer>
                  <StarRatingWithState />
                </StyledWrapper>
              </StyledWrapper>
              <StyledWrapper gap="10px">
                <StyledWrapper
                  flexDirection="column"
                  alignItems="start"
                  gap="5px"
                >
                  <StyledBookInformationDetails>
                    Жанр: ..............................
                  </StyledBookInformationDetails>
                  <StyledBookInformationDetails>
                    Год публикации: .........
                  </StyledBookInformationDetails>
                  <StyledBookInformationDetails>
                    Язык: ...............................
                  </StyledBookInformationDetails>
                  <StyledBookInformationDetails>
                    Кол-во страниц: .........
                  </StyledBookInformationDetails>
                </StyledWrapper>
                <StyledWrapper
                  flexDirection="column"
                  alignItems="start"
                  gap="5px"
                >
                  <StyledContainer>{foundedBook.genre}</StyledContainer>
                  <StyledContainer>{foundedBook.publishYear}</StyledContainer>
                  <StyledContainer>русский</StyledContainer>
                  <StyledContainer>{foundedBook.numberPages}</StyledContainer>
                </StyledWrapper>
              </StyledWrapper>
            </StyledWrapper>
          </StyledWrapper>
          <StyledContainer padding="20px 20px">
            <StyledLabel>Описание</StyledLabel>
            <StyledBookDescriptionPanel>
              {foundedBook.description}
            </StyledBookDescriptionPanel>
          </StyledContainer>
        </>
      )}
    </Page>
  );
};
