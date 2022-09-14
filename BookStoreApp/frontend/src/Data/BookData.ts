// import book1 from '../BookImages/Dzhoan_Rouling__Garri_Potter_i_uznik_Azkabana.jpeg';
// import book2 from '../BookImages/Stiven_King__Zeljonaya_milya.jpeg';
// import book3 from '../BookImages/Margaret_Mitchell__Unesennye_vetrom_komplekt_iz_2h_knig.jpeg';
// import book4 from '../BookImages/Artur_Konan_Dojl__Sherlok_Holms._Vse_povesti_i_rasskazy_o_syschike_No_1_sbornik.jpeg';
// import book5 from '../BookImages/Nora_Sakavich__Svita_korolya.jpeg';
// import book6 from '../BookImages/Ketrin_Stokett__Prisluga.jpeg';
// import book7 from '../BookImages/Dzhon_R._R._Tolkin__Vlastelin_Kolets_Vozvraschenie_korolya.jpeg';
// import book8 from '../BookImages/Aleksandr_Dyuma__Graf_MonteKristo.jpeg';
// import book9 from '../BookImages/Dzhordzh_Martin__Burya_mechej.jpeg';
// import book10 from '../BookImages/Stiven_King__Pobeg_iz_Shoushenka.jpeg';
import { http } from '../http';

// book item
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
// all books from server
export interface BookDataFromServer {
  bookId: number;
  name: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  imageName: string;
  imageSrc: string;
  ratings: Array<{
    ratingId: number;
    users: Array<{
      userId: number;
    }>;
    value: number;
    qty: number;
  }>;
  price: number;
  description: string;
  authors: Array<{
    authorId: number;
    name: string;
  }>;
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
// Book list from server with search and pagination
export interface BookListViewFromServer {
  bookList: Array<{
    bookId: number;
    name: string;
    genre: string;
    pageNumber: number;
    publishYear: number;
    imageName: string;
    imageSrc: string;
    ratings: Array<{
      ratingId: number;
      users: Array<{
        userId: number;
      }>;
      value: number;
      qty: number;
    }>;
    price: number;
    description: string;
    authors: Array<{
      authorId: number;
      name: string;
    }>;
  }>;
  pageInfo: PageInfo;
}
export interface Author {
  authorId: number;
  name: string;
}
export interface UserId {
  userId: number;
}
export interface Rating {
  ratingId: number;
  users: UserId[];
  value: number;
  qty: number;
}
export interface BooksCollection {
  books: Book[] | null;
}
export const mapBookFromServer = (book: BookDataFromServer): Book => ({
  ...book,
});
export const mapBookListViewFromServer = (
  bookListView: BookListViewFromServer,
): BookListView => {
  console.log(typeof bookListView);
  console.log(typeof bookListView.bookList);
  return {
    bookList: {
      ...bookListView.bookList.map((book) => ({
        ...book,
        authors: book.authors.map((authors) => ({ ...authors })),
        rating: book.ratings.map((rating) => ({
          ...rating,
          users: rating.users.map((userId) => ({ ...userId })),
        })),
      })),
    },
    pageInfo: bookListView.pageInfo,
  };
};
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

// get Book with id
export const getBookAsync = async (bookId: number): Promise<Book | null> => {
  const result = await http<BookDataFromServer>(
    { path: `/books/${bookId}` },
    false,
  );
  if (result.ok && result.body) {
    return mapBookFromServer(result.body);
  } else return null;
};
export const getAllBooksAsync = async (): Promise<Book[]> => {
  const result = await http<BookDataFromServer[]>(
    { path: '/books/allBooks' },
    false,
    true,
  );
  if (result.ok && result.body) {
    return result.body.map(mapBookFromServer);
  } else return [];
};
export const getBookListView = async (
  criteria?: string,
  page?: number,
): Promise<BookListView | null> => {
  if (criteria) {
    const result = await http<BookListViewFromServer>(
      {
        path: `/books?criteria=${criteria}&page=${page}`,
      },
      false,
    );
    if (result.ok && result.body) {
      return mapBookListViewFromServer(result.body);
    } else return null;
  } else {
    const result = await http<BookListViewFromServer>(
      {
        path: `/books/page/${page}`,
      },
      false,
    );
    if (result.ok && result.body) {
      console.log(typeof result.body);
      return mapBookListViewFromServer(result.body);
    } else return null;
  }
};

// export interface Picture {
//   imageName: string;
//   imageSrc: string | ArrayBuffer | null | undefined;
//   imageFile: object | null;
// }

// Create book on server
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

// Test 1 post data to server
// easy interface

export const postBookAsync = async (
  book: FormData,
): Promise<Book | undefined> => {
  const result = await http<BookDataFromServer, FormData>(
    {
      path: '/books',
      method: 'post',
      body: book,
    },
    true,
    true,
  );
  if (result.ok && result.body) {
    return mapBookFromServer(result.body);
  } else {
    return undefined;
  }
};

// Post books rating
export interface postRatingData {
  bookId: number;
  userId: number;
  value: number;
}
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

// Edit book
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
export const editBookAsync = async (
  bookId: number,
  putBookData: FormData,
): Promise<Book | null> => {
  const result = await http<BookDataFromServer, FormData>(
    {
      path: `/books/${bookId}`,
      method: 'put',
      body: putBookData,
    },
    true,
    true,
  );
  if (result.ok && result.body) {
    return mapBookFromServer(result.body);
  } else return null;
};

// Delete book
export const deleteBookAsync = async (bookId: number): Promise<Book | null> => {
  const result = await http<BookDataFromServer>(
    {
      path: `/books/${bookId}`,
      method: 'delete',
    },
    false,
    true,
  );
  if (result.ok && result.body) {
    return mapBookFromServer(result.body);
  } else return null;
};
export interface PostCartData {
  bookId: number;
  qty: number | null;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface PostOrderData {
  cartItems: CartItem[];
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  zip: string;
}
export interface OrderDataFromServer {
  cartItems: Array<{
    book: Book;
    quantity: number;
  }>;
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  zip: string;
}
export const postOrderAsync = async (postOrderData: PostOrderData) => {
  const result = await http<OrderDataFromServer, PostOrderData>(
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

interface Role {
  roleId: number;
  name: string;
}
interface UserDataFromServer {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  passwordHash: [];
  passwordSalt: [];
}
export const postRegisterDataAsync = async (registerData: FormData) => {
  const result = await http<UserDataFromServer, FormData>(
    {
      path: `/auth/register`,
      method: 'post',
      body: registerData,
    },
    true,
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};
export interface AuthorizedUserData {
  userId: number;
  email: string;
  role: string;
  token: string;
}

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
