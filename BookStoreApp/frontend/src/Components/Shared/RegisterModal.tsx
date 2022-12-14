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
      message="?????????????????????? ?????????????? ??????????????????"
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
                ?????????????? ?????????????????????? ???????????? ????????????????????????, ???????????????????? ??????????????????...
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
              ?????????????????????? ???? ??????????
            </StyledModalHeader>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="userFirstName">??????</StyledLabel>
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
                    ?????????????? ?????? ????????????????????????
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.userFirstName &&
                errors.userFirstName.type === 'maxLength' && (
                  <StyledErrorContainerWithMaxSize>
                    ?????? ???????????????????????? ???? ???????????? ?????????????????? 20 ????????????????
                  </StyledErrorContainerWithMaxSize>
                )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="userLastName">??????????????</StyledLabel>
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
                    ?????????????? ?????????????? ????????????????????????
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.userLastName &&
                errors.userLastName.type === 'maxLength' && (
                  <StyledErrorContainerWithMaxSize>
                    ?????????????? ???????????????????????? ???? ???????????? ?????????????????? 20 ????????????????
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
                  ?????????????? E-mail
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  Email ???? ???????????? ?????????????????? 20 ????????????????
                </StyledErrorContainerWithMaxSize>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="phoneNumber">?????????? ????????????????</StyledLabel>
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
                  ?????????????? ?????????? ????????????????
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  ?????????? ???????????????? ???? ?????????? ?????????????????? 12 ????????????????
                </StyledErrorContainerWithMaxSize>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="password">????????????</StyledLabel>
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
                  ?????????????? ????????????
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <StyledErrorContainerWithMaxSize>
                  ???????????? ???? ???????????? ???????? ???????????? 5 ????????????????
                </StyledErrorContainerWithMaxSize>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <StyledErrorContainerWithMaxSize>
                  ???????????? ???? ???????????? ?????????????????? 20 ????????????????
                </StyledErrorContainerWithMaxSize>
              )}
            </StyledWrapper>
            <StyledWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <StyledLabel htmlFor="passwordConfirm">
                ?????????????????????????? ????????????
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
                    ?????????????????? ????????????
                  </StyledErrorContainerWithMaxSize>
                )}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === 'validate' && (
                  <StyledErrorContainerWithMaxSize>
                    ???????????? ???????????? ??????????????????
                  </StyledErrorContainerWithMaxSize>
                )}
            </StyledWrapper>
            <StyledButtonWrapperWithMedia>
              <StyledButtonSuccessModal>
                ?????????????????? ????????????
              </StyledButtonSuccessModal>
              <StyledButtonNormalModal onClick={() => onOpenLoginModal()}>
                ?????? ???????? ???????????????
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
