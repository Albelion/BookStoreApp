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
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Auth';
//import SessionManager from '../../SessionManager';
import SuccessModal from './SuccessModal';

const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;

interface LoginModalProps {
  onCloseLoginModal: () => void;
  onOpenReginsterModal: () => void;
}

type FormData = {
  email: string;
  password: string;
};

const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const LoginModal = ({
  onCloseLoginModal,
  onOpenReginsterModal,
}: LoginModalProps) => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  //set loading false
  const { signIn } = useAuth();
  const submitForm = async (data: FormData) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const result = await signIn(formData);
    await wait(3000);
    if (result) {
      setSuccessfullySubmitted(() => true);
    }
  };
  const onCloseSuccessModal = () => {
    onCloseLoginModal();
  };
  return successfullySubmitted ? (
    <SuccessModal
      message="Вы успешно вошли!"
      onCloseSucessModal={onCloseSuccessModal}
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
              <StyledCancelButton onClick={() => onCloseLoginModal()}>
                <IoMdClose size="20px" />
              </StyledCancelButton>
            </StyledExitContainer>
            <StyledModalHeader margin="10px 0 20px 0px">
              Вход на сайт
            </StyledModalHeader>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="email">E-mail</StyledLabel>
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
                  Пароль не должен превышать 20 символов
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
            <StyledWrapper gap="10px" margin="30px 10px 10px 10px">
              <StyledButtonSuccessModal>Войти</StyledButtonSuccessModal>
              <StyledButtonNormalModal onClick={() => onOpenReginsterModal()}>
                Зарегистрироваться
              </StyledButtonNormalModal>
            </StyledWrapper>
          </StyledWrapper>
        </form>
      </StyledModalWrapper>
    </StyledBackground>
  );
};
export default LoginModal;
