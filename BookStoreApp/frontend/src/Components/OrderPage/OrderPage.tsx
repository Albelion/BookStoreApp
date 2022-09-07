import { Page } from '../Shared/Page';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
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
  purple3,
} from '../Shared/styles';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { postOrderAsync, CartItem, PostOrderData } from '../../Data/BookData';

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
  color: white;
  &:hover {
    background-color: ${purple3};
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
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
      }
    };
    postDataAsync();
  };
  return (
    <Page title="Оформление заказа">
      <StyledMainContainer>
        <StyledWrapper>
          <StyledLink to="/cart">
            <StyledWrapper justifyContent="start" gap="3px">
              <StyledArrow size="20px" />
              <StyledContainer>Назад в корзину</StyledContainer>
            </StyledWrapper>
          </StyledLink>
        </StyledWrapper>
        <StyledForm onSubmit={handleSubmit(submitForm)}>
          <StyledMainOrderInformation>
            <StyledWrapper flexDirection="column" gap="30px">
              {/* Контактная информация */}
              <StyledSection>
                <StyledHeaderSection>
                  Контактная информация:
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
                      <StyledLabel htmlFor="userName">Ф.И.О.</StyledLabel>
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
                            Введите Ф.И.О.:
                          </StyledErrorContainer>
                        )}
                      {errors.userName &&
                        errors.userName.type === 'minLength' && (
                          <StyledErrorContainer>
                            Минимальное количество символов - 1
                          </StyledErrorContainer>
                        )}
                      {errors.userName &&
                        errors.userName.type === 'maxLength' && (
                          <StyledErrorContainer>
                            Поле не должно превышать 50 символов
                          </StyledErrorContainer>
                        )}
                    </StyledWrapper>
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                    >
                      <StyledLabel htmlFor="phoneNumber">
                        Номер телефона:
                      </StyledLabel>
                      <StyledInputOrder
                        {...register('phoneNumber', {
                          required: true,
                          minLength: 1,
                          maxLength: 8,
                        })}
                        name="phoneNumber"
                        type="number"
                        id="phoneNumber"
                      />
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === 'required' && (
                          <StyledErrorContainer>
                            Введите телефонный номер
                          </StyledErrorContainer>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === 'minLength' && (
                          <StyledErrorContainer>
                            Минимальное количество символов - 1
                          </StyledErrorContainer>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === 'maxLength' && (
                          <StyledErrorContainer>
                            Поле не должно превышать 8 символов
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
                          Введите ваш Email
                        </StyledErrorContainer>
                      )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                </StyledRowSectionWrapper>
              </StyledSection>
              {/* Способ доставки */}
              <StyledSection>
                <StyledHeaderSection>Способ доставки: </StyledHeaderSection>
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
                      <StyledLabel htmlFor="country">Страна:</StyledLabel>
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
                          Укажите название страны
                        </StyledErrorContainer>
                      )}
                      {errors.country &&
                        errors.country.type === 'maxLength' && (
                          <StyledErrorContainer>
                            Поле не должно превышать 10 символов
                          </StyledErrorContainer>
                        )}
                    </StyledWrapper>
                    <StyledWrapper
                      flexDirection="column"
                      alignItems="start"
                      width="100%"
                    >
                      <StyledLabel htmlFor="city">Город:</StyledLabel>
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
                          Укажите название города
                        </StyledErrorContainer>
                      )}
                      {errors.city && errors.city.type === 'maxLength' && (
                        <StyledErrorContainer>
                          Поле не должно превышать 10 символов
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
                      <StyledLabel htmlFor="zip">Почтовый индекс:</StyledLabel>
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
                          Укажите почтовый индекс
                        </StyledErrorContainer>
                      )}
                      {errors.zip && errors.zip.type === 'maxLength' && (
                        <StyledErrorContainer>
                          Поле не должно превышать 10 символов
                        </StyledErrorContainer>
                      )}
                    </StyledWrapper>
                  </StyledColumnWrapper>
                </StyledRowSectionWrapper>
              </StyledSection>
              {/* Способ оплаты */}
              <StyledSection>
                <StyledHeaderSection>Способ оплаты: </StyledHeaderSection>
              </StyledSection>
              <StyledCartWrapperWithMedia
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                gap="10px"
              >
                <StyledPrimaryTextContainer>Итого:</StyledPrimaryTextContainer>
                <StyledWrapper width="100%">
                  <StyledSecondaryTextContainer>
                    Товаров на сумму:
                  </StyledSecondaryTextContainer>
                  <StyledSecondaryTextContainer>
                    {orderSum} р.
                  </StyledSecondaryTextContainer>
                </StyledWrapper>
                <StyledWrapper width="100%">
                  <StyledSecondaryTextContainer>
                    Стоимость доставки:
                  </StyledSecondaryTextContainer>
                  <StyledSecondaryTextContainer>
                    {deliverPrice} р.
                  </StyledSecondaryTextContainer>
                </StyledWrapper>
                <StyledSumWrapper width="100%">
                  <StyledPrimaryTextContainer>
                    К оплате:
                  </StyledPrimaryTextContainer>
                  <StyledContainer>
                    {orderSum + deliverPrice} р.
                  </StyledContainer>
                </StyledSumWrapper>
                <StyledBuyButton disabled={isSubmitting}>
                  Оформить заказ
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
              <StyledPrimaryTextContainer>Итого:</StyledPrimaryTextContainer>
              <StyledWrapper width="100%">
                <StyledSecondaryTextContainer>
                  Товаров на сумму:
                </StyledSecondaryTextContainer>
                <StyledSecondaryTextContainer>
                  {orderSum} р.
                </StyledSecondaryTextContainer>
              </StyledWrapper>
              <StyledWrapper width="100%">
                <StyledSecondaryTextContainer>
                  Стоимость доставки:
                </StyledSecondaryTextContainer>
                <StyledSecondaryTextContainer>
                  {deliverPrice} р.
                </StyledSecondaryTextContainer>
              </StyledWrapper>
              <StyledSumWrapper width="100%">
                <StyledPrimaryTextContainer>
                  К оплате:
                </StyledPrimaryTextContainer>
                <StyledContainer>{orderSum + deliverPrice} р.</StyledContainer>
              </StyledSumWrapper>
              <StyledBuyButton disabled={isSubmitting}>
                Оформить заказ
              </StyledBuyButton>
            </StyledCartWrapper>
          </StyledCartInformation>
        </StyledForm>
      </StyledMainContainer>
    </Page>
  );
};
export default OrderPage;
