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
    background-color: ${grey1};
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
          <StyledButton onClick={() => onChangeTheme()}>
            {currentTheme.bodyColor === '#fff' ? (
              <MdOutlineLightMode size="20px" />
            ) : (
              <MdOutlineNightlight size="20px" />
            )}
          </StyledButton>
        </StyledWrapper>
      </StyledWrapper>
    </StyledMediaContainer>
  );
};
