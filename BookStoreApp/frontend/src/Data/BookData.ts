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
  autors: Autor[];
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
    value: number;
    qty: number;
  }>;
  price: number;
  description: string;
  autors: Array<{
    autorId: number;
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
      value: number;
      qty: number;
    }>;
    price: number;
    description: string;
    autors: Array<{
      autorId: number;
      name: string;
    }>;
  }>;
  pageInfo: PageInfo;
}
export interface Autor {
  autorId: number;
  name: string;
}
export interface Rating {
  ratingId: number;
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
        autors: book.autors.map((autors) => ({ ...autors })),
        rating: book.ratings.map((rating) => ({ ...rating })),
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

/*export const BookList: Book[] = [

  {
    id: 1,
    name: 'Гарри Поттер и узник Азкабана',
    genre: 'фантастика',
    numberPages: 1245,
    publishYear: 2019,
    src: book1,
    rating: 2.5,
    price: 300,
    description:
      'Специальное издание для учеников и выпускников «Гриффиндора» к 20-летию первой публикации книги «Гарри Поттер и узник Азкабана',
    autors: [
      {
        id: 1,
        name: 'Джоан Роулинг',
      },
    ],
  },
  {
    id: 2,
    name: 'Зеленая миля',
    genre: 'фантастика',
    numberPages: 1103,
    publishYear: 2014,
    src: book2,
    rating: 3.3,
    price: 450,
    description:
      'Стивен Кинг приглашает читателей в жуткий мир тюремного блока смертников, откуда уходят, чтобы не вернуться, приоткрывает дверь',
    autors: [
      {
        id: 2,
        name: 'Стивен Кинг',
      },
    ],
  },
  {
    id: 3,
    name: 'Унесенные ветром',
    genre: 'фантастика',
    numberPages: 832,
    publishYear: 2020,
    src: book3,
    rating: 4.7,
    price: 220,
    description:
      "«Унесенные ветром» — история красавицы южанки, женщины с твердым характером, которая борется за личное счастье и благополучие, пока привычный мир вокруг гибнет. Беззаботную юность Скарлетт О'Хары унесли могучие ветры Гражданской войны. В один миг девушке пришлось повзрослеть: шум балов сменился грохотом канонад, мать умерла, отец сошел с ума, родное поместье опустело. Однако Скарлетт, капризную и своенравную, но, вместе с тем, сильную и отчаянную, не сломить ни любовным неудачам, ни сложностям жизни, ни грузу ответственности за близких. Ее пленительное обаяние и невероятная целеустремленность помогут пережить все испытания и обрести веру в себя. Роман о том, что любовь к жизни бывает важнее любви; о том, что заставляет нас жить — что бы ни творилось вокруг.",
    autors: [
      {
        id: 3,
        name: 'Маргарет Митчелл',
      },
    ],
  },
  {
    id: 4,
    name: 'Шерлок Холмс. Все повести и рассказы о сыщике N1',
    genre: 'детектив',
    numberPages: 1502,
    publishYear: 2019,
    src: book4,
    rating: 4.8,
    price: 235,
    description:
      'Шерлок Холмс – литературный персонаж, созданный талан-том английского писателя Артура Конан Дойла (1859–1930). Его произведения, посвященн...',
    autors: [
      {
        id: 4,
        name: 'Артур Конан Дойл',
      },
    ],
  },
  {
    id: 5,
    name: 'Свита короля',
    genre: 'приключения',
    numberPages: 241,
    publishYear: 2021,
    src: book5,
    rating: 4.8,
    price: 632,
    description:
      'Время на исходе. Оказавшись в Университете Пальметто, Нил Джостен знал, что не доживет до конца года, но теперь, когда смерть не за горами, он',

    autors: [
      {
        id: 5,
        name: 'Нора Сакатович',
      },
    ],
  },
  {
    id: 6,
    name: 'Прислуга',
    genre: 'роман',
    numberPages: 352,
    publishYear: 2016,
    src: book6,
    rating: 4.7,
    price: 952,
    description:
      'Американский Юг, на дворе 1960-е годы. Скитер только-только закончила университет и возвращается домой, в сонный городок Джексон, где никогда ничего не происходит. Она мечтает стать писательницей, вырваться в большой мир. Но приличной девушке с Юга не пристало тешиться столь глупыми иллюзиями, приличной девушке следует выйти замуж и хлопотать по дому. Мудрая Эйбилин на тридцать лет старше Скитер, она прислуживает в домах белых всю свою жизнь, вынянчила семнадцать детей и давно уже ничего не ждет от жизни, ибо сердце ее разбито после смерти единственного сына. Минни - самая лучшая стряпуха во всем Джексоне, а еще она самая дерзкая служанка в городе. И острый язык не раз уже сослужил ей плохую службу. На одном месте Минни никогда подолгу не задерживается. Но с Минни лучше не связываться даже самым высокомерным белым дамочкам. Двух черных служанок и белую неопытную девушку объединяет одно - обостренное чувство справедливости и желание хоть как-то изменить порядок вещей. Смогут ли эти трое противостоять целому миру? Сумеют ли они выжить в этой борьбе?',

    autors: [
      {
        id: 6,
        name: 'Кэтрин Стокетт',
      },
    ],
  },
  {
    id: 7,
    name: 'Властелин Колец: Возвращение короля',
    genre: 'фантастика',
    numberPages: 2156,
    publishYear: 2020,
    src: book7,
    rating: 4.8,
    price: 630,
    description:
      'Джон Рональд Руэл Толкин (3.01.1892—2.09.1973) — писатель, поэт, филолог, профессор Оксфордского университета, родоначальник современной фэнтези. В 1937 году был написан «Хоббит», а в середине 1950-х годов увидели свет три книги «Властелина Колец», повествующие о Средиземье — мире, населенном представителями волшебных рас со сложной культурой, историей и мифологией. В последующие годы эти романы были переведены на все мировые языки, адаптированы для кино, мультипликации, аудиопьес, театра, компьютерных игр, комиксов и породили массу подражаний и пародий. Алан Ли (р. 20.08.1947) — художник-иллюстратор десятков книг в жанре фэнтези. Наибольшую известность приобрели его обложки и иллюстрации к произведениям Джона Р. Р. Толкина: «Хоббит», «Властелин Колец», «Дети Хурина». Также иллюстрировал трилогию «Горменгаст» Мервина Пика, цикл средневековых валлийских повестей «Мабиногион» и многое другое.',
    autors: [
      {
        id: 7,
        name: 'Джон Р.Р. Толкин',
      },
    ],
  },
  {
    id: 8,
    name: 'Граф Монте-Кристо',
    genre: 'роман',
    numberPages: 632,
    publishYear: 2017,
    src: book8,
    rating: 4.8,
    price: 214,
    description:
      'Как и сто шестьдесят пять лет назад, "Граф Монте-Кристо" Александра Дюма остается одним из самых популярных романов в мировой литературе. К нему писали продолжения, его ставили на сцене, создавали мюзиклы, экранизировали, но и по сей день бесчисленные издания этой книги доставляют удовольствие новым и новым поколениям читателей. История молодого парижанина, которого приятели в шутку засадили в тюрьму, почерпнута автором в архивах парижской полиции. А из-под пера мастера выходит моряк Эдмон Дантес, мученик замка Иф. Не дождавшись правосудия, он решает сам вершить суд и жестоко мстит врагам, разрушившим его счастье. В настоящем издании роман сопровождается полным комплектом иллюстраций французских художников XIX века к первым публикациям «Графа Монте-Кристо». В издание также включена история сапожника Франсуа Пико, взятая из криминальной хроники, послужившая прообразом сюжетных перипетий романа.',

    autors: [
      {
        id: 8,
        name: 'Александр Дюма',
      },
    ],
  },
  {
    id: 9,
    name: 'Буря мечей',
    genre: 'фантастика',
    numberPages: 732,
    publishYear: 2008,
    src: book9,
    rating: 4.7,
    price: 532,
    description:
      'Перед вами - знаменитая эпопея "Песнь льда и огня". Эпическая, чеканная сага о мире Семи Королевств. О мире суровых земель вечного холода и...',

    autors: [
      {
        id: 9,
        name: 'Джордж Мартин',
      },
    ],
  },
  {
    id: 10,
    name: 'Побег из Шоушенка',
    genre: 'фантастика',
    numberPages: 532,
    publishYear: 2011,
    src: book10,
    rating: 4.6,
    price: 632,
    description:
      'Страшный сон, ставший реальностью... История невинного человека, приговоренного к пожизненному заключению в тюремном аду. Жесткая...',
    autors: [
      {
        id: 2,
        name: 'Стивен Кинг',
      },
    ],
  },
];*/

/*const waitAsync = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};*/

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
  autors: Array<{
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
  autors: string[];
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
  );
  if (result.ok && result.body) {
    return result.body;
  } else return null;
};

/*export interface CartInformation {
  items: CartItem[];
}*/
// export interface CartDataFromServer {
//   cartItems: Array<{
//     cartItemId: number;
//     book: BookDataFromServer;
//     quantity: number;
//   }>;
//   totalValue: number;
//   totalQty: number;
// }
/*export const mapCartDataFromServer = (
  cartData: CartDataFromServer,
): CartInformation => ({
  items: [
    ...cartData.cartItems.map((item) => ({
      ...item,
      book: mapBookFromServer(item.book),
    })),
  ],
  totalValue: cartData.totalValue,
  totalQty: cartData.totalQty,
});*/

// Get data from cart
/*export const getItemFromSessionCart =
  async (): Promise<CartInformation | null> => {
    const result = await http<CartDataFromServer>(
      {
        path: '/cart',
        method: 'get',
      },
      false,
    );
    if (result.ok && result.body) {
      return mapCartDataFromServer(result.body);
    } else return null;
  };*/

// Add to Session Cart
// export const addItemToSessionCart = async (
//   item: PostCartData,
// ): Promise<CartInformation | null> => {
//   const result = await http<CartDataFromServer, PostCartData>(
//     {
//       path: '/cart',
//       method: 'post',
//       body: item,
//     },
//     false,
//   );
//   if (result.ok && result.body) {
//     return mapCartDataFromServer(result.body);
//   } else return null;
// };

// // Remover item from the Cart
// export const removeItemFromCart = async (
//   bookId: number,
// ): Promise<CartInformation | null> => {
//   const result = await http<CartDataFromServer>(
//     {
//       path: `/cart/${bookId}`,
//       method: 'delete',
//     },
//     false,
//   );
//   if (result.ok && result.body) {
//     return mapCartDataFromServer(result.body);
//   } else return null;
// };
