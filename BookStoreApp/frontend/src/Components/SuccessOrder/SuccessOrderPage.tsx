import { Page } from '../Shared/Page';
import styled from 'styled-components';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StyledWrapper, StyledContainer, purple5 } from '../Shared/styles';

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
const SuccessOrderPage = () => {
  return (
    <Page title="Ваш заказ принят!">
      <StyledWrapper>
        <StyledLink to="/">
          <StyledWrapper justifyContent="start" gap="3px">
            <StyledArrow size="20px" />
            <StyledContainer>На главную страницу</StyledContainer>
          </StyledWrapper>
        </StyledLink>
      </StyledWrapper>
    </Page>
  );
};

export default SuccessOrderPage;
