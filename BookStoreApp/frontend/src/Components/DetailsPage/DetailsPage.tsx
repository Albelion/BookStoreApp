import { Page } from '../Shared/Page';
import styled from 'styled-components';
import { Book } from '../../Data/BookData';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StyledWrapper, StyledContainer, StyledButton } from '../Shared/styles';
import StarRatingWithState from '../HomePage/StarRatingWithState';
import { TiStarFullOutline } from 'react-icons/ti';
import { getBookAsync } from '../../Data/BookData';
import { BiCheck } from 'react-icons/bi';
import { grey4, grey6 } from '../Shared/styles';
import { getAverageRating, CartItem } from '../../Data/BookData';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

interface BooksLoadingState {
  readonly loading: boolean;
  readonly viewing: Book | null;
}
export interface AppState {
  readonly books: BooksLoadingState;
}
const notifyToSetStar = () => {
  toast.success('Ваша оценка принята', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const StyledImageDetailsWrapper = styled.img`
  width: 100%;
  border-radius: 0;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  height: 100%;
  alt: 'Book';
  align-self: center;
  border-radius: 5%;
  object-fit: cover;
`;

const StyledBookDescriptionPanel = styled(StyledContainer)`
  font-size: 1.5rem;
  text-align: start;
  @media ${(props) => props.theme.media.phone} {
    font-size: 1.2rem;
  }
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
  color: ${(props) => props.theme.fontColorSecondary};
`;
const StyledLabel = styled.div`
  text-align: start;
  font-size: 2rem;
  font-weight: bold;
  @media ${(props) => props.theme.media.phone} {
    font-size: 1.5rem;
  }
`;
const StyledPriceDetail = styled(StyledContainer)`
  font-weight: bold;
`;
const StyledBuyButton = styled(StyledButton)`
  background-color: #1cc84e;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  padding: 10px 8px;
  &:hover {
    background-color: #1fd654;
  }
  &:disabled {
    background-color: ${grey4};
    color: ${grey6};
  }
`;
const StyledImageWrapper = styled(StyledWrapper)`
  resize: both;
  max-width: 260px;
  max-height: 380px;
`;
const StyledMediaWrapperPc = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.phone} {
    display: none;
  }
`;
const StyledMediaWrapperPhoneAndTablet = styled(StyledWrapper)`
  margin-top: 20px;
  margin-left: 30px;
  @media ${(props) => props.theme.media.pc} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  } ;
`;
const StyledMainSectionWithPhoneMedia = styled(StyledWrapper)`
  justify-content: start;
  @media ${(props) => props.theme.media.phone} {
    justify-content: center;
  }
`;
const StyledMediaWrapperPhoneAndTabletTitle = styled(
  StyledMediaWrapperPhoneAndTablet,
)`
  margin-top: 0px;
`;
interface DetailsPageProps {
  addToCart: (book: Book) => void;
  storedBookInCart: CartItem[];
}

export const DetailsPage = ({
  addToCart,
  storedBookInCart,
}: DetailsPageProps) => {
  //get booksId from parameters
  const { bookId } = useParams();
  //set loading false
  const [foundedBook, setFoundBook] = useState<Book | null>(null);
  // is Book added to Cart?
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    let cancelled: boolean = false;
    const getBook = async (bookId: number) => {
      const foundedBook = await getBookAsync(bookId);
      if (!cancelled && foundedBook) {
        setFoundBook(foundedBook);
      }
    };
    if (bookId) {
      getBook(Number(bookId));
      const isStored = storedBookInCart.find(
        (f) => f.book.bookId === Number(bookId),
      )
        ? true
        : false;
      setIsAddedToCart(isStored);
    }
    return () => {
      cancelled = true;
    };
  }, [bookId, storedBookInCart]);
  return (
    <Page title={foundedBook ? 'Информация о книге' : 'Поиск'}>
      {foundedBook !== null && (
        <>
          <StyledMediaWrapperPhoneAndTabletTitle>
            <StyledContainer>
              <BookTitleStyled>{foundedBook.name}</BookTitleStyled>
              <BookAutorStyled>
                {foundedBook.autors.map((autor) => autor.name + ' ')}
              </BookAutorStyled>
            </StyledContainer>
          </StyledMediaWrapperPhoneAndTabletTitle>
          <StyledMainSectionWithPhoneMedia
            gap="50px"
            alignItems="top"
            padding="0px 20px"
          >
            <StyledImageWrapper>
              <StyledImageDetailsWrapper
                src={
                  foundedBook.imageName === ''
                    ? '/Images/noimage.jpg'
                    : foundedBook.imageSrc
                }
              />
            </StyledImageWrapper>
            <StyledMediaWrapperPc
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
                  <StyledContainer>
                    {getAverageRating(foundedBook.ratings)}
                  </StyledContainer>
                  <TiStarFullOutline color="#ffc107" size="20px" />
                </StyledWrapper>
                <StyledWrapper>
                  <StyledContainer>Моя оценка: </StyledContainer>
                  <StarRatingWithState
                    bookId={foundedBook.bookId}
                    notify={notifyToSetStar}
                  />
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
                  <StyledContainer>{foundedBook.pageNumber}</StyledContainer>
                </StyledWrapper>
              </StyledWrapper>
              <StyledWrapper
                flexDirection="column"
                alignItems="start"
                gap="6px"
              >
                <StyledWrapper>
                  <BiCheck color="green" size="15px" />
                  <StyledContainer>В наличии</StyledContainer>
                </StyledWrapper>
                <StyledWrapper gap="8px">
                  <StyledPriceDetail>{foundedBook.price} р.</StyledPriceDetail>
                  <StyledBuyButton
                    onClick={() => {
                      setIsAddedToCart(true);
                      return addToCart(foundedBook);
                    }}
                    disabled={isAddedToCart ? true : false}
                  >
                    Добавить в корзину
                  </StyledBuyButton>
                </StyledWrapper>
              </StyledWrapper>
            </StyledMediaWrapperPc>
          </StyledMainSectionWithPhoneMedia>
          <StyledMediaWrapperPhoneAndTablet
            flexDirection="column"
            alignItems="start"
            gap="20px"
          >
            <StyledWrapper justifyContent="start" gap="10px">
              <StyledWrapper>
                <StyledContainer>
                  {foundedBook.ratings
                    .map((x) => x.value)
                    .reduce((sum, current) => sum + current) /
                    foundedBook.ratings.length}
                </StyledContainer>
                <TiStarFullOutline color="#ffc107" size="20px" />
              </StyledWrapper>
              <StyledWrapper>
                <StyledContainer>Моя оценка: </StyledContainer>
                <StarRatingWithState
                  bookId={foundedBook.bookId}
                  notify={notifyToSetStar}
                />
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
                <StyledContainer>{foundedBook.pageNumber}</StyledContainer>
              </StyledWrapper>
            </StyledWrapper>
            <StyledWrapper flexDirection="column" alignItems="start" gap="6px">
              <StyledWrapper>
                <BiCheck color="green" size="15px" />
                <StyledContainer>В наличии</StyledContainer>
              </StyledWrapper>
              <StyledWrapper gap="8px">
                <StyledPriceDetail>{foundedBook.price} р.</StyledPriceDetail>
                <StyledBuyButton
                  onClick={() => {
                    setIsAddedToCart(true);
                    return addToCart(foundedBook);
                  }}
                  disabled={isAddedToCart ? true : false}
                >
                  Добавить в корзину
                </StyledBuyButton>
              </StyledWrapper>
            </StyledWrapper>
          </StyledMediaWrapperPhoneAndTablet>
          <StyledContainer padding="20px 20px">
            <StyledLabel>Описание</StyledLabel>
            <StyledBookDescriptionPanel>
              {foundedBook.description}
            </StyledBookDescriptionPanel>
          </StyledContainer>
        </>
      )}
      <ToastContainer />
    </Page>
  );
};
