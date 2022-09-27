import { http } from '../http';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// default image path
export const defaultNoImageSrc = '/Images/noimage.jpg';

// list of available genres
export const listOfGenre = [
  'не выбрано',
  'детектив',
  'комедия',
  'ужасы',
  'фантастика',
  'роман',
];

// list of available book ratings
export const listOfRatings = ['не выбрано', '1', '2', '3', '4', '5'];

// notification types
export const enum NotifyType {
  ERROR,
  SUCCESS,
  INFO,
}

// ---Book Section---

// Book item
export interface Book {
  bookId: number;
  name: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  imageName: string;
  imageSrc: string;
  ratings: Rating[];
  price: number;
  description: string;
  authors: Author[];
}

// information about pagination
export interface PageInfo {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  criteria?: string;
}

// Book list with search and pagination
export interface BookListView {
  bookList: Book[];
  pageInfo: PageInfo;
}

// Autor data
export interface Author {
  authorId: number;
  name: string;
}

// Rating data

export interface Rating {
  ratingId: number;
  users: UserDataFromServer[];
  value: number;
  qty: number;
}

// get Book from server with Id
export const getBookAsync = async (bookId: number): Promise<Book | null> => {
  const result = await http<Book>({ path: `/books/${bookId}` }, false);
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

// get all books from server with authentication (admin only)
export const getAllBooksAsync = async (): Promise<Book[]> => {
  const result = await http<Book[]>({ path: '/books/allBooks' }, false, true);
  if (result.ok && result.body) {
    return result.body;
  } else return [];
};

// get book list wiht pagination information and criteria
export const getBookListView = async (
  criteria?: string,
  page?: number,
): Promise<BookListView | null> => {
  if (criteria) {
    const result = await http<BookListView>(
      {
        path: `/books?criteria=${criteria}&page=${page}`,
      },
      false,
    );
    if (result.ok && result.body) {
      return result.body;
    } else return null;
  } else {
    const result = await http<BookListView>(
      {
        path: `/books/page/${page}`,
      },
      false,
    );
    if (result.ok && result.body) {
      return result.body;
    } else return null;
  }
};

// Post book model
export interface PostBookData {
  name: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  imageFile: null | object;
  price: number;
  description: string;
  rating?: number;
  authors: Array<{
    name: string;
  }>;
}

// async post book to server with authentication token
export const postBookAsync = async (
  book: FormData,
): Promise<Book | undefined> => {
  const result = await http<Book, FormData>(
    {
      path: '/books',
      method: 'post',
      body: book,
    },
    true,
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};

// Post book rating model
export interface postRatingData {
  bookId: number;
  userId: number;
  value: number;
}
// async post book rating to server with authentication token
export const postRatingAsync = async (
  rating: postRatingData,
): Promise<Rating | undefined> => {
  const result = await http<Rating, postRatingData>(
    {
      path: '/books/rating',
      method: 'post',
      body: rating,
    },
    false,
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};

// Edit book model
export interface PutBookData {
  name: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  imageFile: object | null;
  price: number;
  description: string;
  authors: string[];
}

// async put book model to server with authentication token
export const editBookAsync = async (
  bookId: number,
  putBookData: FormData,
): Promise<Book | null> => {
  const result = await http<Book, FormData>(
    {
      path: `/books/${bookId}`,
      method: 'put',
      body: putBookData,
    },
    true,
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

// delete book from the server with authentication token
export const deleteBookAsync = async (bookId: number): Promise<Book | null> => {
  const result = await http<Book>(
    {
      path: `/books/${bookId}`,
      method: 'delete',
    },
    false,
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

// --- Order section ---

// cart item model
export interface CartItem {
  book: Book;
  quantity: number;
}

// order data model
export interface PostOrderData {
  cartItems: CartItem[];
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  zip: string;
}

// async post order data to server authentication token
export const postOrderAsync = async (postOrderData: PostOrderData) => {
  const result = await http<PostOrderData, PostOrderData>(
    {
      path: `/order`,
      method: 'post',
      body: postOrderData,
    },
    false,
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

// --- User Section ---

// Role data model
interface Role {
  roleId: number;
  name: string;
}
// User data model
interface UserDataFromServer {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  passwordHash: [];
  passwordSalt: [];
}

// async post user data to server (registration)
export interface ResponseRegisterBody {
  ok: boolean;
  body: any;
}
export const postRegisterDataAsync = async (
  registerData: FormData,
): Promise<ResponseRegisterBody> => {
  const result = await http<UserDataFromServer, FormData>(
    {
      path: `/auth/register`,
      method: 'post',
      body: registerData,
    },
    true,
  );
  if (result.ok && result.body) {
    return { ok: true, body: result.body };
  } else return { ok: false, body: result.errorBody };
};

// user data model with authentication token from the server
export interface AuthorizedUserData {
  userId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  token: string;
}

// async post user data model to server (login)
export const postLoginDataAsync = async (loginData: FormData) => {
  const result = await http<AuthorizedUserData, FormData>(
    {
      path: `/auth/login`,
      method: 'post',
      body: loginData,
    },
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

// --- Function Section ---

// estimate average book rating
export const getAverageRating = (rating: Rating[]): number => {
  return (
    Math.round(
      (rating
        .map((x) => x.value * x.qty)
        .reduce((sum, current) => sum + current) /
        rating.map((x) => x.qty).reduce((sum, current) => sum + current)) *
        10,
    ) / 10
  );
};

// correct print authors name
export const printAuthorsName = (authors: Author[]): string => {
  return authors
    .map((a) =>
      a.name
        .toLowerCase()
        .split(' ')
        .map((a) => a.charAt(0).toUpperCase().concat(a.slice(1, a.length)))
        .join(' '),
    )
    .join(', ');
};

// esitmate order sum
export const calculateSumOrder = (cart: CartItem[]): number => {
  return cart.length !== 0
    ? cart
        .map((item) => item.book.price * item.quantity)
        .reduce((sum, current) => sum + current)
    : 0;
};
// estimate num of added to cart
export const calculateNumAddedToCart = (cart: CartItem[]): number => {
  return cart.length === 0
    ? 0
    : cart.map((item) => item.quantity).reduce((sum, qty) => sum + qty);
};

// toast notification
export const onNotify = (notifyType: NotifyType, message: string) => {
  switch (notifyType) {
    case NotifyType.ERROR:
      toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      break;
    case NotifyType.SUCCESS:
      toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      break;
    case NotifyType.INFO:
      toast.info(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      break;
  }
};
