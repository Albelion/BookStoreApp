import { Book, printAuthorsName, getAverageRating } from '../../Data/BookData';
import styled from 'styled-components';
import {
  StyledWrapper,
  StyledContainer,
  grey5,
  ImageDefault,
} from '../Shared/styles';
import StarRatingView from './StarRatingView';
import { Link } from 'react-router-dom';

const BookCardStyled = styled(StyledWrapper)`
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  opacity: 0.8;
  transition: 0.5 linear;
  padding: 10px 2px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
interface CartTitleProps {
  lengthOfTitle: number;
}
const CardTitle = styled.h2<CartTitleProps>`
  font-size: ${(props) => (props.lengthOfTitle > 30 ? '1em' : '1.2em')};
  font-weight: bold;
  text-align: start;
`;
export const BookImageStyled = styled(ImageDefault)`
  width: 100%;
  height: 100%;
  alt: 'Book';
  align-self: center;
  border-radius: 5%;
  margin-bottom: 5px;
  object-fit: cover;
`;
const StyledBookImageWrapper = styled(StyledContainer)`
  width: 320px;
  height: 470px;
`;
export const BookRaitingStyle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: orange;
`;

const StyledCardFoterInformation = styled(StyledWrapper)`
  height: 92px;
  margin: 10px 0px;
  gap: 4px;
  align-items: start;
  border-top: 2px solid ${grey5};
`;
const StyledAuthorInformationContainer = styled(StyledContainer)`
  color: ${(props) => props.theme.fontColorSecondary};
  font-size: 0.9em;
`;
const StyledLinkCard = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  book: Book;
}

export const BookCardItem = ({ book }: Props) => {
  return (
    <BookCardStyled>
      <StyledLinkCard to={`/books/${book.bookId}`}>
        <StyledContainer padding="10px 20px 0px 20px">
          <StyledBookImageWrapper>
            <BookImageStyled imageSrc={book.imageSrc} />
          </StyledBookImageWrapper>
          <StyledCardFoterInformation flexDirection="column">
            <StyledWrapper justifyContent="center">
              <StarRatingView rating={getAverageRating(book.ratings)} />
            </StyledWrapper>
            <StyledContainer>
              <CardTitle lengthOfTitle={book.name.length}>
                {book.name}
              </CardTitle>
            </StyledContainer>
            <StyledAuthorInformationContainer>
              {printAuthorsName(book.authors)}
            </StyledAuthorInformationContainer>
          </StyledCardFoterInformation>
        </StyledContainer>
      </StyledLinkCard>
    </BookCardStyled>
  );
};
