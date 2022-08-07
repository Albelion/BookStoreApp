import React from 'react';
import { Book } from '../../Data/BookData';
import styled from 'styled-components';
import bookPict from '../../BookImages/noimage.jpg';
import { StyledWrapper, StyledContainer } from '../Shared/styles';
//import { useNavigate } from 'react-router-dom';
import StarRatingView from './StarRatingView';
import { grey5 } from '../Shared/styles';
import { Link } from 'react-router-dom';

const BookCardStyled = styled(StyledWrapper)`
  flex-direction: column;
  //align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  opacity: 0.8;
  transition: 0.5 linear;
  padding: 10px 2px;
  // mouse-over, add a deeper shadow
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
const CardTitle = styled.h2`
  font-weight: bold;
  font-size: 1.2em;
  text-align: start;
`;
export const BookImageStyled = styled.img`
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

// const BuyButtonStyled = styled(StyledButton)`
//   border-radius: 10%;
//   font-weight: bold;
//   border: 0;
//   padding: 5px;
//   opacity: 0.4;
//   transition: 0.2s linear;
//   font-size: 1.3em;
//   :hover {
//     opacity: 1;
//   }
// `;

const StyledCardFoterInformation = styled(StyledWrapper)`
  margin: 10px 0px;
  gap: 4px;
  align-items: start;
  border-top: 2px solid ${grey5};
`;
const StyledAutorInformationContainer = styled(StyledContainer)`
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
  //const navigate = useNavigate();
  // const handleDetailsButtonClick = () => {
  //   navigate(`books/${book.id}`);
  // };
  return (
    <BookCardStyled>
      <StyledLinkCard to={`/books/${book.id}`}>
        <StyledContainer padding="10px 20px 0px 20px">
          <StyledBookImageWrapper>
            <BookImageStyled
              src={book.src === 'noImage' ? bookPict : book.src}
            />
          </StyledBookImageWrapper>
          <StyledCardFoterInformation flexDirection="column">
            <StyledWrapper justifyContent="center">
              <StarRatingView rating={book.rating} />
            </StyledWrapper>
            <StyledContainer>
              <CardTitle>{book.name}</CardTitle>
            </StyledContainer>
            <StyledAutorInformationContainer>
              {book.autors.map((autor) => autor.name).join(' ')}
            </StyledAutorInformationContainer>
          </StyledCardFoterInformation>
        </StyledContainer>
      </StyledLinkCard>
    </BookCardStyled>
  );
};
