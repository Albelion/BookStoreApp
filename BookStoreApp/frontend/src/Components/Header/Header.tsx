//import styled from 'styled-components';
import { NavigationSection } from './NavigationSection';
import { SearchSection } from './SearchSection';
import { StyledContainer, StyledWrapper } from '../Shared/styles';
import styled from 'styled-components';

const HeaderMainWrapper = styled(StyledWrapper)`
  flex-direction: column;
  background-color: ${(props) => props.theme.bodyColor};
`;
const StyledStickyContainer = styled(StyledContainer)`
  display: block;
  position: sticky;
  width: 100%;
  margin: 10px 0px;
  top: 0px;
  z-index: 2;
`;
interface HeaderProps {
  onChangeTheme: () => void;
  numAddedToCart: number;
}

export const Header = ({ onChangeTheme, numAddedToCart }: HeaderProps) => {
  return (
    <StyledStickyContainer
      display="block"
      position="sticky"
      width="100%"
      margin="10px 0px"
    >
      <HeaderMainWrapper>
        <SearchSection numAddedToCart={numAddedToCart} />
        <NavigationSection onChangeTheme={onChangeTheme} />
      </HeaderMainWrapper>
    </StyledStickyContainer>
  );
};
