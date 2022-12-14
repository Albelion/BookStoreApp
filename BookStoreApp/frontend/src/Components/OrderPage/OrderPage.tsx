import { Page } from '../Shared/Page';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledContainer,
  StyledWrapper,
  StyledInput,
  StyledLabel,
  StyledButton,
  grey4,
  grey1,
  purple5,
  purple2,
  purple4,
} from '../Shared/styles';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SessionManager from '../../SessionManager';
import {
  postOrderAsync,
  CartItem,
  PostOrderData,
  NotifyType,
  onNotify,
} from '../../Data/BookData';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type FormData = {
  userName: string;
  country: string;
  phoneNumber: string;
  city: string;
  address: string;
  email: string;
  zip: string;
};
const StyledLink = styled(Link)`
  margin-bottom: 1em;
  margin-left: 0.5em;
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
`;
const StyledArrow = styled(BsArrowLeftSquare)`
  &:hover {
    background-color: ${purple5};
  }
`;
const StyledMainOrderInformation = styled.div`
  background-color: ${(props) => props.theme.backgroundMain};
  flex: 3;
`;
const StyledSection = styled.section`
  width: 100%;
  border: 1px solid ${grey4};
  border-top: 2px solid ${purple5};
  padding: 15px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;
const StyledCartInformation = styled.section`
  flex: 1;
  @media ${(props) => props.theme.media.phone} {
    display: none;
  }
`;
const StyledSumWrapper = styled(StyledWrapper)`
  margin-top: 10px;
  border-top: 1px solid ${grey4};
`;
const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;
const StyledForm = styled.form`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const StyledHeaderSection = styled(StyledContainer)`
  font-weight: bold;
  font-size: 1.2rem;
  text-align: start;
  margin-bottom: 20px;
`;
const StyledInputOrder = styled(StyledInput)`
  background-color: ${grey1};
  &:focus {
    background-color: white;
  }
`;
const StyledPrimaryTextContainer = styled(StyledContainer)`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${(props) => props.theme.fontColorPrimary};
`;
const StyledSecondaryTextContainer = styled(StyledContainer)`
  color: ${(props) => props.theme.fontColorSecondary};
`;
const StyledMainContainer = styled(StyledContainer)`
  text-align: start;
`;
const StyledCartWrapper = styled(StyledWrapper)`
  border: 1px solid ${grey4};
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  min-width: 250px;
  border-radius: 4px;
  @media ${(props) => props.theme.media.phone} {
    display: none;
  } ;
`;
const StyledCartWrapperWithMedia = styled(StyledCartWrapper)`
  @media ${(props) => props.theme.media.pc} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }
  @media ${(props) => props.theme.media.phone} {
    width: 100%;
    display: block;
  } ;
`;

const StyledColumnWrapper = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.phone} {
    min-width: 150px;
    align-items: center;
  }
  @media ${(props) => props.theme.media.pc} {
    width: 48%;
  } ;
`;
const StyledRowSectionWrapper = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.phone} {
    justify-content: center;
  }
  @media ${(props) => props.theme.media.pc} {
    justify-content: start;
  }
  @media ${(props) => props.theme.media.tablet} {
    justify-content: start;
  }
`;
const StyledBuyButton = styled(StyledButton)`
  background-color: ${purple5};
  border-radius: 2px;
  color: ${(props) => (props.theme.nameOfTheme === 'light' ? '#fff' : '#000')};
  &:hover {
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? purple4 : purple2};
  }
`;

interface OrderPageProps {
  orderSum: number;
  cartItems: CartItem[];
  removeAllCartItems: () => void;
}
const OrderPage = ({
  orderSum,
  cartItems,
  removeAllCartItems,
}: OrderPageProps) => {
  const deliverPrice = 200;
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    let cancelled: boolean = false;
    const getUserData = SessionManager.getUser();
    if (getUserData) {
      if (!cancelled) {
        if (getUserData?.fullName) setValue('userName', getUserData.fullName);
        if (getUserData?.email) setValue('email', getUserData.email);
        if (getUserData?.phoneNumber)
          setValue('phoneNumber', getUserData.phoneNumber);
        setUserLoading(false);
      }
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //set loading false
  const submitForm = ({
    userName,
    country,
    phoneNumber,
    city,
    address,
    email,
    zip,
  }: FormData) => {
    const postOrderData: PostOrderData = {
      cartItems: cartItems,
      userName: userName,
      country: country,
      phoneNumber: phoneNumber,
      city: city,
      email: email,
      zip: zip,
    };
    const postDataAsync = async () => {
      const result = await postOrderAsync(postOrderData);
      if (result) {
        removeAllCartItems();
        navigate('/sucessOrder');
      } else {
        onNotify(
          NotifyType.ERROR,
          '?????? ???????????????? ???????????? ???????????? ?????????????????? ????????????',
        );
      }
    };
    postDataAsync();
  };
  return (
    <Page
      title={
        userLoading ? '???????????????? ???????????? ????????????????????????...' : '???????????????????? ????????????'
      }
    >
      <StyledMainContainer>
        <StyledWrapper>
          <StyledLink to="/cart">
            <StyledWrapper justifyContent="start" gap="3px">
              <StyledArrow size="20px" />
              <StyledContainer>?????????? ?? ??????????????</StyledContainer>
            </StyledWrapper>
          </StyledLink>
        </StyledWrapper>
        <StyledForm onSubmit={handleSubmit(submitForm)}>
          <StyledMainOrderInformation>
            <StyledWrapper flexDirection="column" gap="30px">
              {/* ???????????????????? ???????????????????? */}
              <StyledSection>
                <StyledHeaderSection>
                  ???????????????????? ????????????????????:
                </StyledHeaderSection>
                <StyledRowSectionWrapper
                  alignItems="top"
                  flexWrap="wrap"
                  gap="10px"
                >
                  <StyledColumnWrapper
                    flexDirection="column"
                    justifyContent="start"
                    alignItems="start"
                    gap="20px"
                    flexWrap="wrap"
                  >
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                      flexWrap="wrap"
                    >
                      <StyledLabel htmlFor="userName">??.??.??.</StyledLabel>
                      <StyledInputOrder
                        {...register('userName', {
                          required: true,
                          minLength: 1,
                          maxLength: 50,
                        })}
                        name="userName"
                        type="text"
                        id="userName"
                      />
                      {errors.userName &&
                        errors.userName.type === 'required' && (
                          <StyledErrorContainer>
                            ?????????????? ??.??.??.:
                          </StyledErrorContainer>
                        )}
                      {errors.userName &&
                        errors.userName.type === 'minLength' && (
                          <StyledErrorContainer>
                            ?????????????????????? ???????????????????? ???????????????? - 1
                          </StyledErrorContainer>
                        )}
                      {errors.userName &&
                        errors.userName.type === 'maxLength' && (
                          <StyledErrorContainer>
                            ???????? ???? ???????????? ?????????????????? 50 ????????????????
                          </StyledErrorContainer>
                        )}
                    </StyledWrapper>
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                    >
                      <StyledLabel htmlFor="phoneNumber">
                        ?????????? ????????????????:
                      </StyledLabel>
                      <StyledInputOrder
                        {...register('phoneNumber', {
                          required: true,
                          maxLength: 12,
                        })}
                        name="phoneNumber"
                        type="text"
                        id="phoneNumber"
                      />
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === 'required' && (
                          <StyledErrorContainer>
                            ?????????????? ???????????????????? ??????????
                          </StyledErrorContainer>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === 'maxLength' && (
                          <StyledErrorContainer>
                            ???????? ???? ???????????? ?????????????????? 12 ????????????????
                          </StyledErrorContainer>
                        )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                  <StyledColumnWrapper
                    flexDirection="column"
                    justifyContent="start"
                    alignItems="start"
                    gap="20px"
                  >
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                      flexWrap="wrap"
                    >
                      <StyledLabel htmlFor="email">Email:</StyledLabel>
                      <StyledInputOrder
                        {...register('email', {
                          required: true,
                        })}
                        name="email"
                        type="email"
                        id="email"
                      />
                      {errors.email && errors.email.type === 'required' && (
                        <StyledErrorContainer>
                          ?????????????? ?????? Email
                        </StyledErrorContainer>
                      )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                </StyledRowSectionWrapper>
              </StyledSection>
              {/* ???????????? ???????????????? */}
              <StyledSection>
                <StyledHeaderSection>???????????? ????????????????: </StyledHeaderSection>
                <StyledRowSectionWrapper
                  alignItems="top"
                  flexWrap="wrap"
                  gap="10px"
                >
                  <StyledColumnWrapper
                    flexDirection="column"
                    justifyContent="start"
                    alignItems="start"
                    gap="20px"
                    flexWrap="wrap"
                  >
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                      flexWrap="wrap"
                    >
                      <StyledLabel htmlFor="country">????????????:</StyledLabel>
                      <StyledInputOrder
                        {...register('country', {
                          required: true,
                          maxLength: 10,
                        })}
                        name="country"
                        type="text"
                        id="country"
                      />
                      {errors.country && errors.country.type === 'required' && (
                        <StyledErrorContainer>
                          ?????????????? ???????????????? ????????????
                        </StyledErrorContainer>
                      )}
                      {errors.country &&
                        errors.country.type === 'maxLength' && (
                          <StyledErrorContainer>
                            ???????? ???? ???????????? ?????????????????? 10 ????????????????
                          </StyledErrorContainer>
                        )}
                    </StyledWrapper>
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                    >
                      <StyledLabel htmlFor="city">??????????:</StyledLabel>
                      <StyledInputOrder
                        {...register('city', {
                          required: true,
                          maxLength: 10,
                        })}
                        name="city"
                        type="text"
                        id="city"
                      />
                      {errors.city && errors.city.type === 'required' && (
                        <StyledErrorContainer>
                          ?????????????? ???????????????? ????????????
                        </StyledErrorContainer>
                      )}
                      {errors.city && errors.city.type === 'maxLength' && (
                        <StyledErrorContainer>
                          ???????? ???? ???????????? ?????????????????? 10 ????????????????
                        </StyledErrorContainer>
                      )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                  <StyledColumnWrapper
                    flexDirection="column"
                    justifyContent="start"
                    alignItems="start"
                    gap="20px"
                  >
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                      flexWrap="wrap"
                    >
                      <StyledLabel htmlFor="zip">???????????????? ????????????:</StyledLabel>
                      <StyledInputOrder
                        {...register('zip', {
                          required: true,
                          maxLength: 10,
                        })}
                        name="zip"
                        type="text"
                        id="zip"
                      />
                      {errors.zip && errors.zip.type === 'required' && (
                        <StyledErrorContainer>
                          ?????????????? ???????????????? ????????????
                        </StyledErrorContainer>
                      )}
                      {errors.zip && errors.zip.type === 'maxLength' && (
                        <StyledErrorContainer>
                          ???????? ???? ???????????? ?????????????????? 10 ????????????????
                        </StyledErrorContainer>
                      )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                </StyledRowSectionWrapper>
              </StyledSection>
              {/* ???????????? ???????????? */}
              <StyledSection>
                <StyledHeaderSection>???????????? ????????????: </StyledHeaderSection>
              </StyledSection>
              <StyledCartWrapperWithMedia
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                gap="10px"
              >
                <StyledPrimaryTextContainer>??????????:</StyledPrimaryTextContainer>
                <StyledWrapper width="100%">
                  <StyledSecondaryTextContainer>
                    ?????????????? ???? ??????????:
                  </StyledSecondaryTextContainer>
                  <StyledSecondaryTextContainer>
                    {orderSum} ??.
                  </StyledSecondaryTextContainer>
                </StyledWrapper>
                <StyledWrapper width="100%">
                  <StyledSecondaryTextContainer>
                    ?????????????????? ????????????????:
                  </StyledSecondaryTextContainer>
                  <StyledSecondaryTextContainer>
                    {deliverPrice} ??.
                  </StyledSecondaryTextContainer>
                </StyledWrapper>
                <StyledSumWrapper width="100%">
                  <StyledPrimaryTextContainer>
                    ?? ????????????:
                  </StyledPrimaryTextContainer>
                  <StyledContainer>
                    {orderSum + deliverPrice} ??.
                  </StyledContainer>
                </StyledSumWrapper>
                <StyledBuyButton disabled={isSubmitting}>
                  ???????????????? ??????????
                </StyledBuyButton>
              </StyledCartWrapperWithMedia>
            </StyledWrapper>
          </StyledMainOrderInformation>
          <StyledCartInformation>
            <StyledCartWrapper
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              gap="10px"
            >
              <StyledPrimaryTextContainer>??????????:</StyledPrimaryTextContainer>
              <StyledWrapper width="100%">
                <StyledSecondaryTextContainer>
                  ?????????????? ???? ??????????:
                </StyledSecondaryTextContainer>
                <StyledSecondaryTextContainer>
                  {orderSum} ??.
                </StyledSecondaryTextContainer>
              </StyledWrapper>
              <StyledWrapper width="100%">
                <StyledSecondaryTextContainer>
                  ?????????????????? ????????????????:
                </StyledSecondaryTextContainer>
                <StyledSecondaryTextContainer>
                  {deliverPrice} ??.
                </StyledSecondaryTextContainer>
              </StyledWrapper>
              <StyledSumWrapper width="100%">
                <StyledPrimaryTextContainer>
                  ?? ????????????:
                </StyledPrimaryTextContainer>
                <StyledContainer>{orderSum + deliverPrice} ??.</StyledContainer>
              </StyledSumWrapper>
              <StyledBuyButton disabled={isSubmitting}>
                ???????????????? ??????????
              </StyledBuyButton>
            </StyledCartWrapper>
          </StyledCartInformation>
        </StyledForm>
      </StyledMainContainer>
      <ToastContainer />
    </Page>
  );
};
export default OrderPage;
