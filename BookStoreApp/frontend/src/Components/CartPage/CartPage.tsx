import { Page } from '../Shared/Page';
//import { StoredBookInCart } from '../../App';
import CartItemComp from './CartItemComp';
//import { useState, useEffect } from 'react';
import { CartItem } from '../../Data/BookData';
import { StyledWrapper, StyledContainer } from '../Shared/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface CartPageProps {
  cartItems: CartItem[];
  onRemove: (bookId: number) => void;
  onChangeQty: (bookId: number, quantity: number) => void;
}
const StyledTotalPriceWrapper = styled(StyledWrapper)`
  margin-right: 10px;
`;
const StyledEmptyCartLabel = styled(StyledContainer)`
  font-size: 2rem;
  padding: 2em;
  color: ${(props) => props.theme.fontColorSecondary};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 5px 8px;
`;
export const CartPage = ({
  cartItems,
  onRemove,
  onChangeQty,
}: CartPageProps) => {
  //const countHandler = () => {};
  /*useEffect(() => {
    if (storedBooks.length !== 0) {
      setTotalPrice(() =>
        storedBooks
          .map((s) => s.book.price * s.qty)
          .reduce((sum, current) => sum + current),
      );
    }
  }, [onRemove, onChangeQty, storedBooks]); */
  return (
    <Page title="Корзина">
      {cartItems.length !== 0 ? (
        <>
          {cartItems.map((storedBook) => {
            return (
              <CartItemComp
                key={storedBook.book.bookId}
                onRemoveItem={onRemove}
                storedBook={storedBook}
                onChangeQty={onChangeQty}
              />
            );
          })}
          <StyledTotalPriceWrapper
            justifyContent="end"
            gap="3px"
            margin="5px 0px"
          >
            <StyledContainer>Итоговая сумма:</StyledContainer>
            <StyledContainer>
              {cartItems.length !== 0
                ? cartItems
                    .map((item) => item.book.price * item.quantity)
                    .reduce((sum, current) => sum + current)
                : 0}
              р.
            </StyledContainer>
            <StyledLink to="/order">Перейти к оформлению заказа</StyledLink>
          </StyledTotalPriceWrapper>
        </>
      ) : (
        <StyledEmptyCartLabel>Ваша корзина пуста</StyledEmptyCartLabel>
      )}
    </Page>
  );
};
