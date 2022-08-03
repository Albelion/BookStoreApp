import React from 'react';
import { Book } from '../../Data/BookData';
import styled from 'styled-components';
import bookPict from '../../BookImages/noimage.jpg';
import { StyledWrapper, StyledContainer, StyledButton } from '../Shared/styles';
import { useNavigate } from 'react-router-dom';
import StarRatingView from './StarRatingView';

const BookCardStyled = styled(StyledWrapper)`
  flex-direction: column;
  //align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  opacity: 0.8;
  transition: 0.5 linear;
  // mouse-over, add a deeper shadow
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
const CardTitle = styled.h2`
  font-weight: bold;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.3em;
  margin-top: 10px;
`;
export const BookImageStyled = styled.img`
  width: 80%;
  height: 80%;
  alt: 'Book';
  align-self: center;
  border-radius: 5%;
  margin-bottom: 5px;
  object-fit: cover;
`;
export const BookRaitingStyle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: orange;
`;

const BuyButtonStyled = styled(StyledButton)`
  border-radius: 10%;
  font-weight: bold;
  border: 0;
  padding: 5px;
  opacity: 0.4;
  transition: 0.2s linear;
  font-size: 1.3em;
  :hover {
    opacity: 1;
  }
`;

const DetailsButtonStyled = styled(BuyButtonStyled)`
  background-color: brown;
`;
const StyledCardFoterInformation = styled(StyledWrapper)`
  margin-bottom: 10px;
`;

interface Props {
  book: Book;
}

export const BookCardItem = ({ book }: Props) => {
  const navigate = useNavigate();
  const handleDetailsButtonClick = () => {
    navigate(`books/${book.id}`);
  };
  return (
    <BookCardStyled>
      <StyledContainer padding="2px 12px" height="auto">
        <CardTitle>{book.name}</CardTitle>
      </StyledContainer>
      <BookImageStyled src={book.src === 'noImage' ? bookPict : book.src} />
      <StyledCardFoterInformation>
        <StyledWrapper>
          <StarRatingView rating={book.rating} />
        </StyledWrapper>
        <DetailsButtonStyled onClick={handleDetailsButtonClick}>
          Подробнее
        </DetailsButtonStyled>
        <BuyButtonStyled>Купить</BuyButtonStyled>
      </StyledCardFoterInformation>
    </BookCardStyled>
  );
};
