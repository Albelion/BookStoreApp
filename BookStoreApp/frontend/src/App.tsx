import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState } from 'react';
import { LightTheme, DarkTheme } from './Components/Shared/theme';
//import { StyledButton } from './Components/Shared/styles';
import { Header } from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { StyledWrapper, StyledContainer } from './Components/Shared/styles';
import styled from 'styled-components';
import { DetailsPage } from './Components/DetailsPage/DetailsPage';
import SearchPage from './Components/SearchPage/SearchPage';
import { Book } from './Data/BookData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartPage } from './Components/CartPage/CartPage';
import AdminPage from './Components/Admin/AdminPage';
import EditPage from './Components/Admin/Edit/EditPage';
import CreatePage from './Components/Admin/Create/CreatePage';
import OrderPage from './Components/OrderPage/OrderPage';

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
function App() {
  const [theme, setTheme] = useState('light');
  const [addedToCart, setAddedToCart] = useState<StoredBookInCart[]>([]);
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const onAddHandler = (book: Book) => {
    notifyOnAddToCart();
    const exist = addedToCart.find(
      (storedBook) => storedBook.book.bookId === book.bookId,
    );
    if (exist) {
      setAddedToCart(
        addedToCart.map((x) =>
          x.book.bookId === book.bookId ? { ...exist, qty: exist.qty + 1 } : x,
        ),
      );
    } else setAddedToCart([...addedToCart, { book, qty: 1 }]);
  };
  /* const onRemoveHandler = (book: Book) => {
    notifyOnRemove();
    const exist = addedToCart.find(
      (storedBook) => storedBook.book.id === book.id,
    );
    if (exist) {
      if (exist.qty > 1) {
        setAddedToCart(
          addedToCart.map((x) =>
            x.book.id === book.id ? { ...exist, qty: exist.qty - 1 } : x,
          ),
        );
      } else setAddedToCart(addedToCart.filter((x) => x.book.id !== book.id));
    }
  };*/

  // change qty books in cart
  const onChangeQtyBooks = (bookId: number, updQty: number) => {
    const exist = addedToCart.find(
      (storedBook) => storedBook.book.bookId === bookId,
    );
    if (exist) {
      setAddedToCart(
        addedToCart.map((x) =>
          x.book.bookId === bookId ? { ...exist, qty: updQty } : x,
        ),
      );
    }
  };

  const onAllRemoveHandler = (book: Book) => {
    notifyOnRemove();
    setAddedToCart(addedToCart.filter((x) => x.book.bookId !== book.bookId));
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
                addedToCart.length !== 0
                  ? addedToCart
                      .map((x) => x.qty)
                      .reduce((sum, current) => sum + current)
                  : 0
              }
            />
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route
                path="books/:bookId"
                element={
                  <DetailsPage
                    storedBookInCart={addedToCart}
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
                    storedBooks={addedToCart}
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
                      addedToCart.length !== 0
                        ? addedToCart
                            .map((s) => s.book.price * s.qty)
                            .reduce((sum, current) => sum + current)
                        : 0
                    }
                  />
                }
              />
            </Routes>
          </StyledMainWrapperContainer>
        </StyledContainer>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
