import { StyledWrapper, StyledLabel } from './styles';
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
  StyledErrorContainerWithMaxSize,
  StyledButtonWrapperWithMedia,
  StyledMainModelItemsWrapperWithMedia,
} from './modalWindowStyles';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  postRegisterDataAsync,
  NotifyType,
  onNotify,
} from '../../Data/BookData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessModal from './SuccessModal';

interface ReginsterModalProps {
  onOpenLoginModal: () => void;
  onCloseRegisterModal: () => void;
}
type FormData = {
  userFirstName: string;
  userLastName: string;
  email: string;
  phoneNumber: string;
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
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    await wait(3000);
    const postRegisterData = async () => {
      const result = await postRegisterDataAsync(formData);
      if (result.ok) {
        setSuccessfullySubmitted(result ? true : false);
      } else onNotify(NotifyType.ERROR, String(result.body));
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
                Попытка регистрации нового пользователя, пожалуйста подождите...
              </StyledMessageLoading>
            </StyledWrapper>
          </StyledLoadingBackground>
        )}
        <form onSubmit={handleSubmit(submitForm)}>
          <StyledMainModelItemsWrapperWithMedia>
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
                  <StyledErrorContainerWithMaxSize>
                    Введите имя пользователя
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.userFirstName &&
                errors.userFirstName.type === 'maxLength' && (
                  <StyledErrorContainerWithMaxSize>
                    Имя пользователя не должно превышать 20 символов
                  </StyledErrorContainerWithMaxSize>
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
                  <StyledErrorContainerWithMaxSize>
                    Введите фамилию пользователя
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.userLastName &&
                errors.userLastName.type === 'maxLength' && (
                  <StyledErrorContainerWithMaxSize>
                    Фамилия пользователя не должна превышать 20 символов
                  </StyledErrorContainerWithMaxSize>
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
                <StyledErrorContainerWithMaxSize>
                  Введите E-mail
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  Email не должен превышать 20 символов
                </StyledErrorContainerWithMaxSize>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="phoneNumber">Номер телефона</StyledLabel>
              <StyledInputLogin
                {...register('phoneNumber', {
                  required: true,
                  maxLength: 12,
                })}
                name="phoneNumber"
                type="text"
                id="phoneNumber"
              />
              {errors.email && errors.email.type === 'required' && (
                <StyledErrorContainerWithMaxSize>
                  Введите номер телефона
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  Номер телефона не может превышать 12 символов
                </StyledErrorContainerWithMaxSize>
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
                <StyledErrorContainerWithMaxSize>
                  Введите пароль
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <StyledErrorContainerWithMaxSize>
                  Пароль не должен быть меньше 5 символов
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  Пароль не должен превышать 20 символов
                </StyledErrorContainerWithMaxSize>
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
                  <StyledErrorContainerWithMaxSize>
                    Повторите пароль
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'validate' && (
                  <StyledErrorContainerWithMaxSize>
                    Пароли должны совпадать
                  </StyledErrorContainerWithMaxSize>
                )}
            </StyledWrapper>
            <StyledButtonWrapperWithMedia>
              <StyledButtonSuccessModal>
                Сохранить данные
              </StyledButtonSuccessModal>
              <StyledButtonNormalModal onClick={() => onOpenLoginModal()}>
                Уже есть аккаунт?
              </StyledButtonNormalModal>
            </StyledButtonWrapperWithMedia>
          </StyledMainModelItemsWrapperWithMedia>
        </form>
      </StyledModalWrapper>
      <ToastContainer />s
    </StyledBackground>
  );
};
export default RegisterModal;
