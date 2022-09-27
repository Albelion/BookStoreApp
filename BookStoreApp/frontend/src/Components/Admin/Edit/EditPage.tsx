import { Page } from '../../Shared/Page';
import {
  StyledWrapper,
  StyledInput,
  StyledLabel,
  StyledFieldSet,
  StyledDescriptionText,
  StyledErrorContainer,
  StyledPostFormButton,
  StyledSelectList,
} from '../../Shared/styles';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getBookAsync,
  Book,
  editBookAsync,
  printAuthorsName,
  listOfGenre,
  NotifyType,
  onNotify,
} from '../../../Data/BookData';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type FormData = {
  hidden: number;
  bookName: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  picture: FileList;
  price: number;
  description: string;
  authors: string;
};

const EditPage = () => {
  //get booksId from parameters
  const { bookId } = useParams();
  const [booksLoading, setBooksLoading] = useState(true);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  //set loading false
  const [foundedBook, setFoundBook] = useState<Book | null>(null);

  const submitForm = async (data: FormData) => {
    const imageFileForm =
      data.picture && data.picture[0] ? data.picture[0] : null;
    // read authors
    const postAuthors = data.authors
      .split(',')
      .map((a) => a.trim().toUpperCase());
    // put data to server
    var formData: any = new FormData();
    formData.append('name', data.bookName);
    formData.append('genre', data.genre);
    formData.append('pageNumber', data.pageNumber);
    formData.append('publishYear', data.publishYear);
    formData.append('imageFile', imageFileForm);
    formData.append('price', data.price);
    formData.append('description', data.description);
    postAuthors.forEach((a) => formData.append('authors', a));
    const result = await editBookAsync(Number(bookId), formData);
    setSuccessfullySubmitted(result ? true : false);
    if (result) {
      onNotify(NotifyType.SUCCESS, 'Книга успешно изменена');
    } else {
      onNotify(
        NotifyType.ERROR,
        'При отправке изменений возникли непредвиденные ошибки',
      );
    }
  };

  useEffect(() => {
    let cancelled: boolean = false;
    const getBook = async (bookId: number) => {
      const foundedBook = await getBookAsync(bookId);
      if (!cancelled) {
        setFoundBook(foundedBook);
        setBooksLoading(false);
        //set formValues:
        if (foundedBook) {
          setValue('authors', printAuthorsName(foundedBook.authors));
          setValue('bookName', foundedBook.name);
          setValue('pageNumber', foundedBook.pageNumber);
          setValue('price', foundedBook.price);
          setValue('description', foundedBook.description);
          setValue('publishYear', foundedBook.publishYear);
          setValue('genre', foundedBook.genre);
        }
      }
    };
    if (bookId) {
      getBook(Number(bookId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);
  return (
    <Page title={booksLoading ? 'Загрузка...' : 'Изменение параметров книги'}>
      <StyledWrapper justifyContent="center">
        <StyledFieldSet
          disabled={isSubmitting || successfullySubmitted ? true : false}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <StyledWrapper
              gap="none"
              position="relative"
              flexDirection="column"
              alignItems="start"
            >
              <StyledLabel htmlFor="bookName">Название книги:</StyledLabel>
              <StyledInput
                {...register('bookName', {
                  //required: true,
                  minLength: 1,
                  maxLength: 50,
                })}
                name="bookName"
                type="text"
                id="bookName"
                defaultValue={foundedBook?.name}
              />
              {errors.bookName && errors.bookName.type === 'required' && (
                <StyledErrorContainer>
                  Введите название книги
                </StyledErrorContainer>
              )}
              {errors.bookName && errors.bookName.type === 'minLength' && (
                <StyledErrorContainer>
                  В названии должен быть как минимум 1 символ
                </StyledErrorContainer>
              )}
              {errors.bookName && errors.bookName.type === 'maxLength' && (
                <StyledErrorContainer>
                  Название книги не должно превышать 50 символов
                </StyledErrorContainer>
              )}
              <StyledLabel htmlFor="authors">Авторы</StyledLabel>
              <StyledInput
                {...register('authors', {
                  //required: true,
                  maxLength: 50,
                  //value: foundedBook?.authors.map((a) => a.name)?.join(', '),
                })}
                name="authors"
                type="text"
                id="authors"
                defaultValue={foundedBook?.authors
                  .map((a) => a.name)
                  ?.join(', ')}
              />
              {errors.authors && errors.authors.type === 'required' && (
                <StyledErrorContainer>
                  Укажите авторов книги через запятую
                </StyledErrorContainer>
              )}
              {errors.authors && errors.authors.type === 'maxLength' && (
                <StyledErrorContainer>
                  Поле не должно превышать 50 символов
                </StyledErrorContainer>
              )}
              <StyledLabel htmlFor="genre">Жанр: </StyledLabel>
              <StyledSelectList
                {...register('genre', { required: true })}
                name="genre"
                id="genre"
              >
                {listOfGenre.map((name) => (
                  <option value={name}>{name}</option>
                ))}
              </StyledSelectList>
              {errors.genre && errors.genre.type === 'required' && (
                <StyledErrorContainer>Введите жанр книги</StyledErrorContainer>
              )}
              <StyledLabel htmlFor="pageNumber">
                Количество страниц:
              </StyledLabel>
              <StyledInput
                {...register('pageNumber', {
                  max: 1000000,
                  min: 1,
                  required: true,
                })}
                name="pageNumber"
                type="number"
                id="pageNumber"
                defaultValue={foundedBook?.pageNumber}
              />
              {errors.pageNumber && errors.pageNumber.type === 'required' && (
                <StyledErrorContainer>
                  Введите количество страниц книги
                </StyledErrorContainer>
              )}
              {errors.pageNumber && errors.pageNumber.type === 'min' && (
                <StyledErrorContainer>
                  Количество страниц не должно быть меньше 1
                </StyledErrorContainer>
              )}
              {errors.pageNumber && errors.pageNumber.type === 'max' && (
                <StyledErrorContainer>
                  Количество страниц не может быть больше 1000000
                </StyledErrorContainer>
              )}
              <StyledLabel htmlFor="publishYear">Год публикации:</StyledLabel>
              <StyledInput
                {...register('publishYear', {
                  required: true,
                  min: 1,
                  max: 2025,
                })}
                name="publishYear"
                type="number"
                id="publishYear"
                defaultValue={foundedBook?.publishYear}
              />
              {errors.publishYear && errors.publishYear.type === 'required' && (
                <StyledErrorContainer>
                  Введите год пубикации книги
                </StyledErrorContainer>
              )}
              {errors.publishYear && errors.publishYear.type === 'min' && (
                <StyledErrorContainer>
                  Минимальное значение: 1
                </StyledErrorContainer>
              )}
              {errors.publishYear && errors.publishYear.type === 'max' && (
                <StyledErrorContainer>
                  Максимальное значение: 2025
                </StyledErrorContainer>
              )}
              <StyledLabel htmlFor="price">Цена: </StyledLabel>
              <StyledInput
                {...register('price', {
                  required: true,
                  min: 0,
                  max: 1000000,
                })}
                name="price"
                type="number"
                id="price"
                defaultValue={foundedBook?.price}
              />
              {errors.price && errors.price.type === 'required' && (
                <StyledErrorContainer>Введите цену книги</StyledErrorContainer>
              )}
              {errors.price && errors.price.type === 'min' && (
                <StyledErrorContainer>
                  Цена не должна быть отрицательной
                </StyledErrorContainer>
              )}
              {errors.price && errors.price.type === 'min' && (
                <StyledErrorContainer>
                  Цена не должна быть больше 1000000
                </StyledErrorContainer>
              )}
              <StyledLabel htmlFor="description">Описание книги:</StyledLabel>
              <StyledDescriptionText
                {...register('description', {
                  required: true,
                  minLength: 10,
                  maxLength: 2000,
                })}
                name="description"
                id="description"
                defaultValue={foundedBook?.description}
              />
              {errors.description && errors.description.type === 'required' && (
                <StyledErrorContainer>
                  Введите описание книги
                </StyledErrorContainer>
              )}
              {errors.description &&
                errors.description.type === 'minLength' && (
                  <StyledErrorContainer>
                    Описание не может быть меньше 10 символов
                  </StyledErrorContainer>
                )}
              {errors.description &&
                errors.description.type === 'maxLength' && (
                  <StyledErrorContainer>
                    Описание не должно превышать 500 символов
                  </StyledErrorContainer>
                )}
              <StyledLabel htmlFor="picture">
                Выбрать другое изображение:
              </StyledLabel>
              <StyledInput
                {...register('picture')}
                name="picture"
                type="file"
                id="picture"
                //value={foundedBook?.imageSrc}
              />
              <StyledPostFormButton type="submit">
                Изменить
              </StyledPostFormButton>
            </StyledWrapper>
          </form>
        </StyledFieldSet>
      </StyledWrapper>
      <ToastContainer />
    </Page>
  );
};
export default EditPage;
