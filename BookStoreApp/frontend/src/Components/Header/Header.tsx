//import styled from 'styled-components';
import { NavigationSection } from './NavigationSection';
import { SearchSection } from './SearchSection';
import { StyledContainer, StyledWrapper } from '../Shared/styles';
import styled from 'styled-components';

const HeaderMainWrapper = styled(StyledWrapper)`
  max-width: 1140px;
  flex-direction: column;
  margin: auto;
`;
interface HeaderProps {
  onChangeTheme: () => void;
}

export const Header = ({ onChangeTheme }: HeaderProps) => {
  return (
    <StyledContainer
      display="block"
      position="fixed"
      width="100%"
      margin="10px 0px"
    >
      <HeaderMainWrapper>
        <SearchSection />
        <NavigationSection onChangeTheme={onChangeTheme} />
      </HeaderMainWrapper>
    </StyledContainer>
  );
};
