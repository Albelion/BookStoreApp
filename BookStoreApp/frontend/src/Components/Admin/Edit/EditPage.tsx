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
import { editBookAsync } from '../../../Data/BookData';

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

const StyledDescriptionText = styled.textarea`
  padding: 8px 10px;
  border: 1px solid ${grey5};
  border-radius: 3px;
  :focus {
    outline-color: ${grey5};
  }
`;
const StyledFormLabel = styled.label`
  font-weight: bold;
`;
const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;
const StyledFieldSet = styled.fieldset`
  padding: 10px 15px;
  width: 80%;
`;
type FormData = {
  hidden: number;
  bookName: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  picture: FileList;
  price: number;
  description: string;
  autors: string;
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
    // read autors
    const postAutors = data.autors.split(',').map((a) => a.trim());
    // put data to server
    var formData: any = new FormData();
    formData.append('name', data.bookName);
    formData.append('genre', data.genre);
    formData.append('pageNumber', data.pageNumber);
    formData.append('publishYear', data.publishYear);
    formData.append('imageFile', imageFileForm);
    formData.append('price', data.price);
    formData.append('description', data.description);
    postAutors.forEach((a) => formData.append('autors', a));
    const result = await editBookAsync(Number(bookId), formData);
    setSuccessfullySubmitted(result ? true : false);
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
          setValue('autors', foundedBook.autors.map((a) => a.name)?.join(', '));
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
    return () => {
      cancelled = true;
    };
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
              <StyledFormLabel htmlFor="bookName">
                Название книги:
              </StyledFormLabel>
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
              <StyledFormLabel htmlFor="autors">Авторы</StyledFormLabel>
              <StyledInput
                {...register('autors', {
                  //required: true,
                  maxLength: 50,
                  //value: foundedBook?.autors.map((a) => a.name)?.join(', '),
                })}
                name="autors"
                type="text"
                id="autors"
                defaultValue={foundedBook?.autors
                  .map((a) => a.name)
                  ?.join(', ')}
              />
              {errors.autors && errors.autors.type === 'required' && (
                <StyledErrorContainer>
                  Укажите авторов книги через запятую
                </StyledErrorContainer>
              )}
              {errors.autors && errors.autors.type === 'maxLength' && (
                <StyledErrorContainer>
                  Поле не должно превышать 50 символов
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
              <StyledFormLabel htmlFor="pageNumber">
                Количество страниц:
              </StyledFormLabel>
              <StyledInput
                {...register('pageNumber', {
                  maxLength: 10,
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
              {errors.pageNumber && errors.pageNumber.type === 'maxLength' && (
                <StyledErrorContainer>
                  Длина поля не должна превышать 10 символов
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
              {errors.publishYear &&
                errors.publishYear.type === 'minLength' && (
                  <StyledErrorContainer>
                    Год должен содержать как минимум 1 символ
                  </StyledErrorContainer>
                )}
              {errors.publishYear &&
                errors.publishYear.type === 'maxLength' && (
                  <StyledErrorContainer>
                    Год публикации не должен превышать 4 символов
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
              <StyledFormLabel htmlFor="description">
                Описание книги:
              </StyledFormLabel>
              <StyledDescriptionText
                {...register('description', {
                  required: true,
                  minLength: 10,
                  maxLength: 400,
                })}
                name="description"
                id="description"
                cols={40}
                rows={10}
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
                    Описание не должно превышать 400 символов
                  </StyledErrorContainer>
                )}
              <StyledFormLabel htmlFor="picture">
                Выбрать другое изображение:
              </StyledFormLabel>
              <StyledInput
                {...register('picture')}
                name="picture"
                type="file"
                id="picture"
                //value={foundedBook?.imageSrc}
              />
              <StyledButton type="submit">Изменить</StyledButton>
            </StyledWrapper>
          </form>
        </StyledFieldSet>
      </StyledWrapper>
    </Page>
  );
};
export default EditPage;
