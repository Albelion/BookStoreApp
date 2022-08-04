import styled from 'styled-components';
import { StyledContainer, StyledWrapper, StyledButton } from '../Shared/styles';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { grey1, purple5 } from '../Shared/styles';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

const StyledLinkNavigation = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.bodyColor === '#fff' ? grey1 : purple5};
    border-bottom: 2px solid ${purple5};
  }
`;
const StyledNavigation = styled.nav`
  width: 100%;
  height: 30px;
`;

interface NavigationSectionProps {
  onChangeTheme: () => void;
}

const StyledMediaContainer = styled(StyledContainer)`
  width: 100%;
  @media ${(props) => props.theme.media.phone} {
    display: none;
  } ;
`;
const StyledSwitchThemeButton = styled(StyledButton)`
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  &:hover {
    border-bottom: 2px solid ${purple5};
    padding-bottom: 13px;
    background-color: transparent;
  }
`;

export const NavigationSection = ({
  onChangeTheme,
}: NavigationSectionProps) => {
  const currentTheme = useTheme();
  return (
    <StyledMediaContainer>
      <StyledWrapper>
        <StyledNavigation>
          <StyledWrapper justifyContent="start">
            <StyledLinkNavigation to="/">Домой</StyledLinkNavigation>
            <StyledLinkNavigation to="/">Продукты</StyledLinkNavigation>
            <StyledLinkNavigation to="/">Обо мне</StyledLinkNavigation>
          </StyledWrapper>
        </StyledNavigation>
        <StyledWrapper>
          <StyledSwitchThemeButton onClick={() => onChangeTheme()}>
            {currentTheme.bodyColor === '#fff' ? (
              <MdOutlineLightMode size="20px" />
            ) : (
              <MdOutlineNightlight size="20px" />
            )}
          </StyledSwitchThemeButton>
        </StyledWrapper>
      </StyledWrapper>
    </StyledMediaContainer>
  );
};
