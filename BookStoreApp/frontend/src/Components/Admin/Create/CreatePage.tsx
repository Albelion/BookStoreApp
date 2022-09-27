import { Page } from '../../Shared/Page';
import {
  StyledWrapper,
  StyledDescriptionText,
  StyledPostFormButton,
  StyledSelectList,
  StyledFieldSet,
  StyledInput,
  StyledLabel,
  StyledErrorContainer,
} from '../../Shared/styles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  postBookAsync,
  listOfGenre,
  listOfRatings,
  onNotify,
  NotifyType,
} from '../../../Data/BookData';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//import FormData from 'form-data';
type FormData1 = {
  bookName: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  picture: FileList;
  rating: string;
  price: number;
  description: string;
  authors: string;
};
const CreatePage = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData1>();

  const submitForm = async (data: FormData1) => {
    // read authors
    const postAuthorFromForm = data.authors
      .split(',')
      .map((a) => a.trim().toUpperCase());
    const imageFileForm =
      data.picture && data.picture[0] ? data.picture[0] : null;
    var formData: any = new FormData();
    formData.append('name', data.bookName);
    formData.append('genre', data.genre);
    formData.append('pageNumber', data.pageNumber);
    formData.append('publishYear', data.publishYear);
    formData.append('imageFile', imageFileForm);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('rating', Number(data?.rating));
    postAuthorFromForm.forEach((a) => formData.append('authors', a));
    const result = await postBookAsync(formData);
    setSuccessfullySubmitted(result ? true : false);
    if (result) {
      onNotify(NotifyType.SUCCESS, 'Книга создана и добавлена в базу данных');
    } else {
      onNotify(
        NotifyType.ERROR,
        'При отправке книги возникли непредвиденные ошибки',
      );
    }
  };

  return (
    <Page title="Добавление книги">
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
                  required: true,
                  minLength: 1,
                  maxLength: 50,
                })}
                name="bookName"
                type="text"
                id="bookName"
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
              <StyledLabel htmlFor="authors">Авторы: </StyledLabel>
              <StyledInput
                {...register('authors', {
                  required: true,
                  maxLength: 50,
                })}
                name="authors"
                type="text"
                id="authors"
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
                {...register('genre', {
                  validate: (val: string) => val !== 'не выбрано',
                })}
                name="genre"
                id="genre"
              >
                {listOfGenre.map((name) => (
                  <option value={name}>{name}</option>
                ))}
              </StyledSelectList>
              {errors.genre && errors.genre.type === 'validate' && (
                <StyledErrorContainer>Введите жанр книги</StyledErrorContainer>
              )}
              <StyledLabel htmlFor="pageNumber">
                Количество страниц:
              </StyledLabel>
              <StyledInput
                {...register('pageNumber', {
                  required: true,
                  min: 1,
                  max: 1000000,
                })}
                name="pageNumber"
                type="number"
                id="pageNumber"
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
              <StyledLabel htmlFor="rating">Рейтинг: </StyledLabel>
              <StyledSelectList
                {...register('rating', {
                  validate: (val: string) => val !== 'не выбрано',
                })}
                name="rating"
                id="rating"
              >
                {listOfRatings.map((name) => (
                  <option value={name}>{name}</option>
                ))}
              </StyledSelectList>
              {errors.genre && errors.genre.type === 'validate' && (
                <StyledErrorContainer>
                  Укажите рейтинг кнгиги
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
                    Описание не должно превышать 2000 символов
                  </StyledErrorContainer>
                )}
              <StyledLabel htmlFor="picture">Изображение: </StyledLabel>
              <StyledInput
                {...register('picture')}
                name="picture"
                type="file"
                id="picture"
                accept="/image/*"
              />
              <StyledPostFormButton type="submit">
                Добавить
              </StyledPostFormButton>
            </StyledWrapper>
          </form>
        </StyledFieldSet>
      </StyledWrapper>
      <ToastContainer />
    </Page>
  );
};
export default CreatePage;
