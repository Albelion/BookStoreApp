import { Page } from '../../Shared/Page';
import styled from 'styled-components';
import {
  StyledWrapper,
  StyledContainer,
  StyledButton,
} from '../../Shared/styles';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookAsync, Book } from '../../../Data/BookData';
import { grey5 } from '../../Shared/styles';

const StyledInput = styled.input`
  padding: 8px 10px;
  border: 1px solid ${grey5};
  border-radius: 3px;
  :focus {
    outline-color: ${grey5};
  }
  width: 100%;
  height: 35px;
`;
const StyledFormLabel = styled.label`
  font-weight: bold;
`;
const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;

type FormData = {
  hidden: number;
  bookName: string;
  genre: string;
  publishYear: number;
  rating: number;
  price: number;
  src: string;
};

const EditPage = () => {
  //get booksId from parameters
  const { bookId } = useParams();
  const [booksLoading, setBooksLoading] = useState(true);
  //const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  //set loading false
  const [foundedBook, setFoundBook] = useState<Book | null>(null);
  const submitForm = ({
    hidden,
    bookName,
    genre,
    publishYear,
    rating,
    price,
    src,
  }: FormData) => {};

  useEffect(() => {
    let cancelled: boolean = false;
    const getBook = async (bookId: number) => {
      const foundedBook = await getBookAsync(bookId);
      if (!cancelled) {
        setFoundBook(foundedBook);
        setBooksLoading(false);
      }
    };
    if (bookId) {
      getBook(Number(bookId));
    }
    return () => {
      cancelled = true;
    };
  }, [bookId]);
  return (
    <Page title={booksLoading ? 'Загрузка...' : 'Изменение параметров книги'}>
      <StyledContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <StyledInput
            {...register('hidden')}
            name="hidden"
            type="hidden"
            id="bookName"
            value={foundedBook?.id}
          />
          <StyledWrapper
            gap="none"
            position="relative"
            flexDirection="column"
            alignItems="start"
          >
            <StyledFormLabel htmlFor="bookName">
              Название книги:
            </StyledFormLabel>
            <StyledInput
              {...register('bookName', {
                required: true,
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
            <StyledFormLabel htmlFor="genre">Жанр: </StyledFormLabel>
            <StyledInput
              {...register('genre', {
                required: true,
                minLength: 1,
                maxLength: 50,
              })}
              name="genre"
              type="text"
              id="genre"
              defaultValue={foundedBook?.genre}
            />
            {errors.genre && errors.genre.type === 'required' && (
              <StyledErrorContainer>Введите жанр книги</StyledErrorContainer>
            )}
            {errors.genre && errors.genre.type === 'minLength' && (
              <StyledErrorContainer>
                В названии должен быть как минимум 1 символ
              </StyledErrorContainer>
            )}
            {errors.genre && errors.genre.type === 'maxLength' && (
              <StyledErrorContainer>
                Название жанра не должно превышать 50 символов
              </StyledErrorContainer>
            )}
            <StyledFormLabel htmlFor="publishYear">
              Год публикации:
            </StyledFormLabel>
            <StyledInput
              {...register('publishYear', {
                required: true,
                minLength: 1,
                maxLength: 4,
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
            {errors.publishYear && errors.publishYear.type === 'minLength' && (
              <StyledErrorContainer>
                Год должен содержать как минимум 1 символ
              </StyledErrorContainer>
            )}
            {errors.publishYear && errors.publishYear.type === 'maxLength' && (
              <StyledErrorContainer>
                Год публикации не должен превышать 4 символов
              </StyledErrorContainer>
            )}
            <StyledFormLabel htmlFor="rating">Рейтинг: </StyledFormLabel>
            <StyledInput
              {...register('rating', {
                required: true,
                minLength: 1,
                maxLength: 5,
                min: 1,
                max: 5,
              })}
              name="rating"
              type="number"
              id="rating"
              defaultValue={foundedBook?.rating}
            />
            {errors.rating && errors.rating.type === 'required' && (
              <StyledErrorContainer>Введите рейтинг книги</StyledErrorContainer>
            )}
            {errors.rating && errors.rating.type === 'minLength' && (
              <StyledErrorContainer>
                Рейтин должен содержать как минимум 1 символ
              </StyledErrorContainer>
            )}
            {errors.rating && errors.rating.type === 'maxLength' && (
              <StyledErrorContainer>
                Длина рейтинга не должна превышть 5 символов
              </StyledErrorContainer>
            )}
            {errors.rating && errors.rating.type === 'min' && (
              <StyledErrorContainer>
                Рейтинг не может быть меньше 1
              </StyledErrorContainer>
            )}
            {errors.rating && errors.rating.type === 'max' && (
              <StyledErrorContainer>
                Рейтинг не может быть больше 5
              </StyledErrorContainer>
            )}
            <StyledFormLabel htmlFor="price">Цена: </StyledFormLabel>
            <StyledInput
              {...register('price', {
                required: true,
                minLength: 1,
                maxLength: 10,
                min: 0,
              })}
              name="price"
              type="number"
              id="price"
              defaultValue={foundedBook?.price}
            />
            {errors.price && errors.price.type === 'required' && (
              <StyledErrorContainer>Введите цену книги</StyledErrorContainer>
            )}
            {errors.price && errors.price.type === 'minLength' && (
              <StyledErrorContainer>
                Цена должна содержать как минимум 1 символ
              </StyledErrorContainer>
            )}
            {errors.price && errors.price.type === 'maxLength' && (
              <StyledErrorContainer>
                Цена не должна превышать 10 символов
              </StyledErrorContainer>
            )}
            {errors.price && errors.price.type === 'min' && (
              <StyledErrorContainer>
                Цена не должна быть отрицательной
              </StyledErrorContainer>
            )}
            <StyledFormLabel htmlFor="src">Изображение: </StyledFormLabel>
            <StyledInput
              {...register('src')}
              name="src"
              type="file"
              id="src"
              defaultValue={foundedBook?.src}
            />
            <StyledButton type="submit">Изменить</StyledButton>
          </StyledWrapper>
        </form>
      </StyledContainer>
    </Page>
  );
};
export default EditPage;
