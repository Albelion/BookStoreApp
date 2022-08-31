import { Page } from '../Shared/Page';
import { StoredBookInCart } from '../../App';
import CartItem from './CartItem';
import { useState, useEffect } from 'react';
import { Book } from '../../Data/BookData';
import { StyledWrapper, StyledContainer } from '../Shared/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface CartPageProps {
  storedBooks: StoredBookInCart[];
  onRemove: (book: Book) => void;
  onChangeQty: (bookId: number, qty: number) => void;
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
  storedBooks,
  onRemove,
  onChangeQty,
}: CartPageProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  //const countHandler = () => {};
  useEffect(() => {
    if (storedBooks.length !== 0) {
      setTotalPrice(() =>
        storedBooks
          .map((s) => s.book.price * s.qty)
          .reduce((sum, current) => sum + current),
      );
    }
  }, [onRemove, onChangeQty, storedBooks]);
  return (
    <Page title="Корзина">
      {storedBooks.length !== 0 ? (
        <>
          {storedBooks.map((storedBook) => {
            return (
              <CartItem
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
            <StyledContainer>{totalPrice} р.</StyledContainer>
            <StyledLink to="/order">Перейти к оформлению заказа</StyledLink>
          </StyledTotalPriceWrapper>
        </>
      ) : (
        <StyledEmptyCartLabel>Ваша корзина пуста</StyledEmptyCartLabel>
      )}
    </Page>
  );
};
