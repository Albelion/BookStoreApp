import { Page } from '../../Shared/Page';
import styled from 'styled-components';
import {
  StyledWrapper,
  StyledContainer,
  StyledButton,
} from '../../Shared/styles';
import { useForm } from 'react-hook-form';
import { grey5 } from '../../Shared/styles';
import { useState } from 'react';
import { postBookAsync } from '../../../Data/BookData';
//import FormData from 'form-data';

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
const StyledFieldSet = styled.fieldset`
  padding: 10px 15px;
  width: 80%;
`;
const StyledFormLabel = styled.label`
  font-weight: bold;
`;
const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;

type FormData1 = {
  bookName: string;
  genre: string;
  pageNumber: number;
  publishYear: number;
  picture: FileList;
  rating?: number;
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
  //set loading false
  const submitForm = async (data: FormData1) => {
    // let initialImageValue: Picture = {
    //   imageName: '',
    //   imageSrc: defaultImageSrc,
    //   imageFile: null,
    // };
    // get Image File

    // if (data.picture && data.picture[0]) {
    //   let imageFile = data.picture[0];

    //   //Read file from server
    //   // const reader = new FileReader();
    //   // reader.onload = (x) => {
    //   //   initialImageValue = {
    //   //     ...initialImageValue,
    //   //     imageFile,
    //   //     imageSrc: x.target?.result,
    //   //   };
    //   // };
    //   // reader.readAsDataURL(imageFile);
    // } else {
    //   initialImageValue = {
    //     ...initialImageValue,
    //     imageFile: null,
    //     imageSrc: defaultImageSrc,
    //   };
    //}

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
    formData.append('rating', data?.rating);
    postAuthorFromForm.forEach((a) => formData.append('authors', a));
    const result = await postBookAsync(formData);
    setSuccessfullySubmitted(result ? true : false);
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
              <StyledFormLabel htmlFor="authors">Авторы: </StyledFormLabel>
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
              <StyledFormLabel htmlFor="publishYear">
                Год публикации:
              </StyledFormLabel>
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
              <StyledFormLabel htmlFor="rating">Рейтинг: </StyledFormLabel>
              <StyledInput
                {...register('rating', {
                  required: false,
                  minLength: 1,
                  maxLength: 5,
                  min: 1,
                  max: 5,
                })}
                name="rating"
                type="number"
                id="rating"
              />
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
              <StyledFormLabel htmlFor="description">
                Описание книги:
              </StyledFormLabel>
              <StyledDescriptionText
                {...register('description', {
                  required: true,
                  minLength: 10,
                  maxLength: 500,
                })}
                name="description"
                id="description"
                cols={50}
                rows={10}
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
              <StyledFormLabel htmlFor="picture">Изображение: </StyledFormLabel>
              <StyledInput
                {...register('picture')}
                name="picture"
                type="file"
                id="picture"
                accept="/image/*"
              />
              <StyledButton type="submit">Добавить</StyledButton>
            </StyledWrapper>
          </form>
        </StyledFieldSet>
      </StyledWrapper>
    </Page>
  );
};
export default CreatePage;
