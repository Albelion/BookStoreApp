import styled from 'styled-components';
import {
  StyledWrapper,
  StyledContainer,
  StyledButton,
  grey5,
  grey3,
  grey1,
  purple5,
} from '../Shared/styles';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BiSearchAlt2, BiLogIn, BiCart } from 'react-icons/bi';
import { GiBookCover } from 'react-icons/gi';
import { GoThreeBars, GoX } from 'react-icons/go';
import { useAuth } from '../../Auth';
import { useState } from 'react';

const StyledSearchButton = styled(StyledButton)`
  position: absolute;
  top: 2px;
  right: 1px;
  border-radius: 3px;
  &:hover {
    border: none;
    background-color: ${grey3};
  }
  padding: 4.2px 10px;
`;

const StyledLink = styled(Link)`
  padding: 0px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  color: ${(props) => props.theme.fontColorPrimary};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey1 : purple5};
  }
`;
const StyledSpanBlock = styled.span`
  display: inline-block;
  width: 100%;
`;

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
const StyledLinkWithMedia = styled(StyledLink)`
  padding: 10px 15px;
  @media ${(props) => props.theme.media.phone} {
    display: none;
  } ;
`;
const StyledButtonBars = styled(StyledButton)`
  @media ${(props) => props.theme.media.pc} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }
`;
const StyledMediaPhoneMenuLinks = styled(StyledWrapper)`
  @media ${(props) => props.theme.media.pc} {
    display: none;
  }
  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }
`;

const StyledLinksBar = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey1 : purple5};
  }
`;
const StyledLogginButton = styled(StyledButton)`
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey1 : purple5};
  }
`;
const StyledLogginButtonWithMedia = styled(StyledLogginButton)`
  @media ${(props) => props.theme.media.phone} {
    display: none;
  } ;
`;
type FormData = {
  search: string;
};

interface SearchSectionProps {
  numAddedToCart: number;
  onOpenLoginModal: () => void;
}

export const SearchSection = ({
  numAddedToCart,
  onOpenLoginModal,
}: SearchSectionProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  const [toggler, setToggler] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const criteria = searchParams.get('criteria') || '';
  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}&page=1`);
  };
  const onLogout = () => {
    signOut();
  };
  return (
    <StyledContainer width="100%" padding="10px">
      <StyledWrapper>
        <StyledLink to="/">
          <StyledContainer>
            <GiBookCover size="40px" />
          </StyledContainer>
          <StyledWrapper>Book Store</StyledWrapper>
        </StyledLink>
        <StyledContainer position="relative" width="70%">
          <StyledSpanBlock>
            <form onSubmit={handleSubmit(submitForm)}>
              <StyledWrapper gap="none" position="relative">
                <StyledInput
                  {...register('search')}
                  name="search"
                  type="text"
                  placeholder="?????????? ???? ????????????..."
                  defaultValue={criteria}
                />
                <StyledSearchButton>
                  <BiSearchAlt2 size="19px" />
                </StyledSearchButton>
              </StyledWrapper>
            </form>
          </StyledSpanBlock>
        </StyledContainer>
        <StyledButtonBars onClick={() => setToggler((toggler) => !toggler)}>
          {toggler ? <GoX size="20px" /> : <GoThreeBars size="20px" />}
        </StyledButtonBars>
        {isAuthenticated ? (
          <StyledLogginButtonWithMedia onClick={() => onLogout()}>
            <StyledWrapper gap="5px">
              <StyledContainer>
                <BiLogIn size="30px" />
              </StyledContainer>
              <StyledContainer>??????????</StyledContainer>
            </StyledWrapper>
          </StyledLogginButtonWithMedia>
        ) : (
          <StyledLogginButtonWithMedia onClick={() => onOpenLoginModal()}>
            <StyledWrapper gap="5px">
              <StyledContainer>
                <BiLogIn size="30px" />
              </StyledContainer>
              <StyledContainer>??????????</StyledContainer>
            </StyledWrapper>
          </StyledLogginButtonWithMedia>
        )}

        <StyledLinkWithMedia to="cart">
          <StyledContainer>
            <BiCart size="30px" />
          </StyledContainer>
          <StyledContainer>{numAddedToCart}</StyledContainer>
          <StyledContainer>??????????????</StyledContainer>
        </StyledLinkWithMedia>
      </StyledWrapper>
      {toggler && (
        <StyledMediaPhoneMenuLinks flexDirection="column">
          <StyledLinksBar to="/">??????????</StyledLinksBar>
          {isAuthenticated && user?.role === 'admin' && (
            <StyledLinksBar to="/">????????????????</StyledLinksBar>
          )}
          {isAuthenticated ? (
            <StyledLogginButton onClick={() => onLogout()}>
              ??????????
            </StyledLogginButton>
          ) : (
            <StyledLogginButton onClick={() => onOpenLoginModal()}>
              ??????????
            </StyledLogginButton>
          )}
          <StyledLinksBar to="cart">??????????????</StyledLinksBar>
        </StyledMediaPhoneMenuLinks>
      )}
    </StyledContainer>
  );
};
