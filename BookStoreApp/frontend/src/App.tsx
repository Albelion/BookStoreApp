import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState, useEffect } from 'react';
import { LightTheme, DarkTheme } from './Components/Shared/theme';
import { Header } from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import {
  StyledContainer,
  StyledMainWrapperContainer,
} from './Components/Shared/styles';
import { DetailsPage } from './Components/DetailsPage/DetailsPage';
import SearchPage from './Components/SearchPage/SearchPage';
import {
  Book,
  CartItem,
  NotifyType,
  onNotify,
  calculateSumOrder,
  calculateNumAddedToCart,
} from './Data/BookData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartPage } from './Components/CartPage/CartPage';
import AdminPage from './Components/Admin/AdminPage';
import EditPage from './Components/Admin/Edit/EditPage';
import CreatePage from './Components/Admin/Create/CreatePage';
import OrderPage from './Components/OrderPage/OrderPage';
import SuccessOrderPage from './Components/SuccessOrder/SuccessOrderPage';
import LoginModal from './Components/Shared/LoginModal';
import RegisterModal from './Components/Shared/RegisterModal';
import { AuthProvider } from './Auth';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
function App() {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState<CartItem[]>(cartFromLocalStorage);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const onAddHandler = (book: Book) => {
    onNotify(NotifyType.SUCCESS, 'Товар добавлен в корзину');
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
    onNotify(NotifyType.ERROR, 'Товар удален из корзины');
    setCart(cart.filter((x) => x.book.bookId !== bookId));
  };

  const onOpenLoginModal = () => {
    setOpenRegisterModal(() => false);
    setOpenLoginModal((prev) => !prev);
  };
  const onOpenRegisterModal = () => {
    setOpenLoginModal(() => false);
    setOpenRegisterModal((prev) => !prev);
  };
  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
      <GlobalStyles />
      <AuthProvider>
        <BrowserRouter>
          <StyledContainer>
            <StyledMainWrapperContainer>
              {openLoginModal && (
                <LoginModal
                  onCloseLoginModal={onOpenLoginModal}
                  onOpenReginsterModal={onOpenRegisterModal}
                />
              )}
              {openRegisterModal && (
                <RegisterModal
                  onCloseRegisterModal={onOpenRegisterModal}
                  onOpenLoginModal={onOpenLoginModal}
                />
              )}
              <Header
                onOpenLoginModel={onOpenLoginModal}
                onChangeTheme={themeToggler}
                numAddedToCart={calculateNumAddedToCart(cart)}
              />
              <Routes>
                <Route path="" element={<HomePage />} />
                <Route
                  path="books/:bookId"
                  element={
                    <DetailsPage
                      storedBookInCart={cart}
                      addToCart={onAddHandler}
                      onOpenLoginModal={onOpenLoginModal}
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
                      onOpenLoginModal={onOpenLoginModal}
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
                      orderSum={calculateSumOrder(cart)}
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
