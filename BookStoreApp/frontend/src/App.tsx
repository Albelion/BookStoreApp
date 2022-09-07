import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState, useEffect } from 'react';
import { LightTheme, DarkTheme } from './Components/Shared/theme';
//import { StyledButton } from './Components/Shared/styles';
import { Header } from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { StyledWrapper, StyledContainer } from './Components/Shared/styles';
import styled from 'styled-components';
import { DetailsPage } from './Components/DetailsPage/DetailsPage';
import SearchPage from './Components/SearchPage/SearchPage';
import { Book, CartItem } from './Data/BookData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartPage } from './Components/CartPage/CartPage';
import AdminPage from './Components/Admin/AdminPage';
import EditPage from './Components/Admin/Edit/EditPage';
import CreatePage from './Components/Admin/Create/CreatePage';
import OrderPage from './Components/OrderPage/OrderPage';
import SuccessOrderPage from './Components/SuccessOrder/SuccessOrderPage';

const StyledMainWrapperContainer = styled(StyledWrapper)`
  max-width: 1140px;
  margin: auto;
  flex-direction: column;
`;
export interface StoredBookInCart {
  book: Book;
  qty: number;
}

const notifyOnAddToCart = () => {
  console.log('add to cart');
  toast.success('Товар добавлен в корзину', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};
const notifyOnRemove = () =>
  toast.error('Товар удален из корзины', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
function App() {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState<CartItem[]>(cartFromLocalStorage);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const onAddHandler = (book: Book) => {
    notifyOnAddToCart();
    const exist = cart.find(
      (storedBook) => storedBook.book.bookId === book.bookId,
    );
    if (exist) {
      setCart(
        cart.map((x) =>
          x.book.bookId === book.bookId
            ? { ...exist, quantity: exist.quantity + 1 }
            : x,
        ),
      );
    } else setCart([...cart, { book: book, quantity: 1 }]);
  };
  /* const onRemoveHandler = (book: Book) => {
    notifyOnRemove();
    const exist = cart.find(
      (storedBook) => storedBook.book.bookId === book.bookId,
    );
    if (exist) {
      if (exist.quantity > 1) {
        setCart(
          cart.map((x) =>
            x.book.bookId === book.bookId
              ? { ...exist, quantity: exist.quantity - 1 }
              : x,
          ),
        );
      } else setCart(cart.filter((x) => x.book.id !== book.id));
    }
  };*/

  // change qty books in cart
  const onChangeQtyBooks = (bookId: number, updQty: number) => {
    const exist = cart.find((storedBook) => storedBook.book.bookId === bookId);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.book.bookId === bookId ? { ...exist, quantity: updQty } : x,
        ),
      );
    }
  };
  const onClearCart = () => {
    setCart(() => []);
  };

  const onAllRemoveHandler = (bookId: number) => {
    notifyOnRemove();
    setCart(cart.filter((x) => x.book.bookId !== bookId));
  };
  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <StyledContainer>
          <StyledMainWrapperContainer>
            <Header
              onChangeTheme={themeToggler}
              numAddedToCart={
                cart.length === 0
                  ? 0
                  : cart
                      .map((item) => item.quantity)
                      .reduce((sum, qty) => sum + qty)
              }
            />
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route
                path="books/:bookId"
                element={
                  <DetailsPage
                    storedBookInCart={cart}
                    addToCart={onAddHandler}
                  />
                }
              />
              <Route path="search" element={<SearchPage />} />
              <Route path="page/:currentPage" element={<HomePage />} />
              <Route
                path="cart"
                element={
                  <CartPage
                    onChangeQty={onChangeQtyBooks}
                    onRemove={onAllRemoveHandler}
                    cartItems={cart}
                  />
                }
              />
              <Route path="admin" element={<AdminPage />} />
              <Route path="edit/:bookId" element={<EditPage />} />
              <Route path="create" element={<CreatePage />} />
              <Route
                path="order"
                element={
                  <OrderPage
                    orderSum={
                      cart.length !== 0
                        ? cart
                            .map((item) => item.book.price * item.quantity)
                            .reduce((sum, current) => sum + current)
                        : 0
                    }
                    cartItems={cart}
                    removeAllCartItems={onClearCart}
                  />
                }
              />
              <Route path="/sucessOrder" element={<SuccessOrderPage />} />
            </Routes>
          </StyledMainWrapperContainer>
        </StyledContainer>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
