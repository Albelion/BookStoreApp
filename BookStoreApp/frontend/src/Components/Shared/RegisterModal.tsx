import { StyledWrapper, StyledContainer, StyledLabel } from './styles';
import {
  StyledBackground,
  StyledModalWrapper,
  StyledModalHeader,
  StyledButtonSuccessModal,
  StyledButtonNormalModal,
  StyledCancelButton,
  StyledInputLogin,
  StyledExitContainer,
  StyledLoadingBackground,
  StyledMessageLoading,
} from './modalWindowStyles';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { postRegisterDataAsync } from '../../Data/BookData';
import SuccessModal from './SuccessModal';

const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;

interface ReginsterModalProps {
  onOpenLoginModal: () => void;
  onCloseRegisterModal: () => void;
}
type FormData = {
  userFirstName: string;
  userLastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const RegisterModal = ({
  onOpenLoginModal,
  onCloseRegisterModal,
}: ReginsterModalProps) => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  //set loading false
  const submitForm = async (data: FormData) => {
    let formData = new FormData();
    formData.append('firstName', data.userFirstName);
    formData.append('lastName', data.userLastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    await wait(3000);
    const postRegisterData = async () => {
      const result = await postRegisterDataAsync(formData);
      setSuccessfullySubmitted(result ? true : false);
    };
    postRegisterData();
  };
  const onCloseSuccessModal = () => {
    onCloseRegisterModal();
  };
  return successfullySubmitted ? (
    <SuccessModal
      onCloseSucessModal={onCloseSuccessModal}
      message="Регистрация успешно завершена"
    />
  ) : (
    <StyledBackground>
      <StyledModalWrapper>
        {isSubmitting && (
          <StyledLoadingBackground>
            <StyledWrapper
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <StyledMessageLoading>
                Попытка входа, пожалуйста подождите...
              </StyledMessageLoading>
            </StyledWrapper>
          </StyledLoadingBackground>
        )}
        <form onSubmit={handleSubmit(submitForm)}>
          <StyledWrapper
            gap="20px"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
          >
            <StyledExitContainer>
              <StyledCancelButton onClick={() => onCloseRegisterModal()}>
                <IoMdClose size="20px" />
              </StyledCancelButton>
            </StyledExitContainer>
            <StyledModalHeader margin="10px 0 20px 0px">
              Регистрация на сайте
            </StyledModalHeader>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="userFirstName">Имя</StyledLabel>
              <StyledInputLogin
                {...register('userFirstName', {
                  required: true,
                  maxLength: 20,
                })}
                name="userFirstName"
                type="text"
                id="userFirstName"
              />
              {errors.userFirstName &&
                errors.userFirstName.type === 'required' && (
                  <StyledErrorContainer>
                    Введите имя пользователя
                  </StyledErrorContainer>
                )}
              {errors.userFirstName &&
                errors.userFirstName.type === 'maxLength' && (
                  <StyledErrorContainer>
                    Имя пользователя не должно превышать 20 символов
                  </StyledErrorContainer>
                )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="userLastName">Фамилия</StyledLabel>
              <StyledInputLogin
                {...register('userLastName', {
                  required: true,
                  maxLength: 20,
                })}
                name="userLastName"
                type="text"
                id="userLastName"
              />
              {errors.userLastName &&
                errors.userLastName.type === 'required' && (
                  <StyledErrorContainer>
                    Введите фамилию пользователя
                  </StyledErrorContainer>
                )}
              {errors.userLastName &&
                errors.userLastName.type === 'maxLength' && (
                  <StyledErrorContainer>
                    Фамилия пользователя не должна превышать 20 символов
                  </StyledErrorContainer>
                )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyledInputLogin
                {...register('email', {
                  required: true,
                  maxLength: 20,
                })}
                name="email"
                type="email"
                id="email"
              />
              {errors.email && errors.email.type === 'required' && (
                <StyledErrorContainer>Введите E-mail</StyledErrorContainer>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledErrorContainer>
                  Email не должен превышать 20 символов
                </StyledErrorContainer>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="password">Пароль</StyledLabel>
              <StyledInputLogin
                {...register('password', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                name="password"
                type="password"
                id="password"
              />
              {errors.password && errors.password.type === 'required' && (
                <StyledErrorContainer>Введите пароль</StyledErrorContainer>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <StyledErrorContainer>
                  Пароль не должен быть меньше 5 символов
                </StyledErrorContainer>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <StyledErrorContainer>
                  Пароль не должен превышать 20 символов
                </StyledErrorContainer>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="passwordConfirm">
                Подтверждение пароля
              </StyledLabel>
              <StyledInputLogin
                {...register('passwordConfirm', {
                  required: true,
                  validate: (val: string) => val === watch('password'),
                })}
                name="passwordConfirm"
                type="password"
                id="passwordConfirm"
              />
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'required' && (
                  <StyledErrorContainer>Повторите пароль</StyledErrorContainer>
                )}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'validate' && (
                  <StyledErrorContainer>
                    Пароли должны совпадать
                  </StyledErrorContainer>
                )}
            </StyledWrapper>
            <StyledWrapper gap="10px" margin="30px 10px 10px 10px">
              <StyledButtonSuccessModal>
                Сохранить данные
              </StyledButtonSuccessModal>
              <StyledButtonNormalModal onClick={() => onOpenLoginModal()}>
                Уже есть аккаунт?
              </StyledButtonNormalModal>
            </StyledWrapper>
          </StyledWrapper>
        </form>
      </StyledModalWrapper>
    </StyledBackground>
  );
};
export default RegisterModal;
