import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { StoredBookInCart } from '../../App';
import NoImage from '../../BookImages/noimage.jpg';
import { StyledWrapper, StyledContainer, StyledButton } from '../Shared/styles';
import React from 'react';
import { grey3 } from '../Shared/styles';
import { Book } from '../../Data/BookData';

const StyledImageCartWrapper = styled.img`
  width: 100%;
  border-radius: 0;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  height: 100%;
  alt: 'Book';
  align-self: center;
  border-radius: 5%;
  object-fit: cover;
  margin-left: 10px;
`;
const StyledPositionInCart = styled(StyledWrapper)`
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media ${(props) => props.theme.media.phone} {
    font-size: 0.8rem;
  }
`;
const StyledRemoveSection = styled(StyledContainer)`
  margin-top: 20px;
  @media ${(props) => props.theme.media.phone} {
    display: none;
  }
`;
const StyledRemoveSectionPhone = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.pc} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }
  border-bottom: 2px solid ${grey3};
`;
const StyledMainWrapperCart = styled(StyledWrapper)`
  padding-bottom: 10px;
  text-align: start;
  border-bottom: 2px solid ${grey3};
  @media ${(props) => props.theme.media.phone} {
    border-bottom: none;
  }
`;

const StyledSelectList = styled.select`
  padding: 2px 10px;
`;
const StyledMenuButton = styled(StyledButton)`
  padding: 0;
  @media ${(props) => props.theme.media.phone} {
    font-size: 0.9rem;
  }
`;
const StyledLabelContainer = styled(StyledContainer)`
  font-weight: bold;
  border-bottom: 1px solid ${grey3};
`;
const StyledAutorContainer = styled(StyledContainer)`
  font-size: 0.8rem;
`;
const StyledNameBookContainer = styled(StyledContainer)`
  font-weight: bold;
  font-size: 1.1rem;
  @media ${(props) => props.theme.media.phone} {
    font-size: 0.9rem;
  }
`;
const StyledImageWrapper = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.pc} {
    resize: both;
    max-width: 210px;
    max-height: 300px;
  }
  @media ${(props) => props.theme.media.phone} {
    max-width: 100px;
    max-height: 170px;
    resize: both;
  }
  @media ${(props) => props.theme.media.tablet} {
    max-width: 160px;
    max-height: 250px;
    resize: both;
  }
`;
const StyledMediaWrapper = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.phone} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  } ;
`;
const StyledMediaWrapperPhoneAndTablet = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.pc} {
    display: none;
  } ;
`;
const StyledFirstPartInform = styled(StyledPositionInCart)`
  max-width: 400px;
  gap: 8px;
`;
interface CartItemProps {
  storedBook: StoredBookInCart;
  onRemoveItem: (book: Book) => void;
  onChangeQty: (bookId: number, qty: number) => void;
}

const CartItem = ({ storedBook, onRemoveItem, onChangeQty }: CartItemProps) => {
  const [numItems, setNumItems] = useState(0);
  const onChangeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numOfBooks = Number(event.target.value);
    onChangeQty(storedBook.book.id, numOfBooks);
    setNumItems(() => numOfBooks);
  };
  useEffect(() => {
    setNumItems(() => storedBook.qty);
  }, []);
  return (
    <StyledContainer padding="0px 10px" margin="25px 0px">
      <StyledMainWrapperCart alignItems="top" justifyContent="start" gap="25px">
        <StyledImageWrapper>
          <StyledImageCartWrapper
            src={
              storedBook.book.src === 'noImage' ? NoImage : storedBook.book.src
            }
          />
        </StyledImageWrapper>

        <StyledWrapper alignItems="top" flex="1 1 auto" gap="10px">
          <StyledFirstPartInform flexDirection="column" justifyContent="start">
            <StyledNameBookContainer>
              {storedBook.book.name}
            </StyledNameBookContainer>
            <StyledAutorContainer>
              {storedBook.book.autors.map((a) => a.name)}
            </StyledAutorContainer>
            <StyledMediaWrapperPhoneAndTablet
              flexDirection="column"
              alignItems="start"
              gap="8px"
            >
              <StyledWrapper gap="4px">
                <StyledLabelContainer>Цена</StyledLabelContainer>
                <StyledContainer>{storedBook.book.price} р.</StyledContainer>
              </StyledWrapper>
              <StyledWrapper gap="4px" flexDirection="row">
                <StyledLabelContainer>Количество</StyledLabelContainer>
                <StyledContainer>
                  <StyledSelectList
                    value={String(numItems)}
                    onChange={onChangeHandle}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </StyledSelectList>
                </StyledContainer>
              </StyledWrapper>
              <StyledWrapper gap="4px" flexDirection="row">
                <StyledLabelContainer>Итоговая сумма</StyledLabelContainer>
                <StyledContainer>
                  {storedBook.book.price * numItems} р.
                </StyledContainer>
              </StyledWrapper>
            </StyledMediaWrapperPhoneAndTablet>
            <StyledRemoveSection>
              <StyledWrapper gap="20px">
                <StyledMenuButton onClick={() => onRemoveItem(storedBook.book)}>
                  Удалить
                </StyledMenuButton>
                <StyledMenuButton>Добавить в избранное</StyledMenuButton>
              </StyledWrapper>
            </StyledRemoveSection>
          </StyledFirstPartInform>
          <StyledMediaWrapper alignItems="top" gap="4vw">
            <StyledPositionInCart gap="4px">
              <StyledLabelContainer>Цена</StyledLabelContainer>
              <StyledContainer>{storedBook.book.price} р.</StyledContainer>
            </StyledPositionInCart>
            <StyledPositionInCart gap="4px">
              <StyledLabelContainer>Количество</StyledLabelContainer>
              <StyledContainer>
                <StyledSelectList
                  value={String(numItems)}
                  onChange={onChangeHandle}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </StyledSelectList>
              </StyledContainer>
            </StyledPositionInCart>
            <StyledPositionInCart gap="4px">
              <StyledLabelContainer>Итоговая сумма</StyledLabelContainer>
              <StyledContainer>
                {storedBook.book.price * numItems} р.
              </StyledContainer>
            </StyledPositionInCart>
          </StyledMediaWrapper>
        </StyledWrapper>
      </StyledMainWrapperCart>
      <StyledRemoveSectionPhone justifyContent="center">
        <StyledWrapper gap="20px">
          <StyledMenuButton onClick={() => onRemoveItem(storedBook.book)}>
            Удалить
          </StyledMenuButton>
          <StyledMenuButton>Добавить в избранное</StyledMenuButton>
        </StyledWrapper>
      </StyledRemoveSectionPhone>
    </StyledContainer>
  );
};
export default CartItem;
