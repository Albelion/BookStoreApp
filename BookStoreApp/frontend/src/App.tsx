import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState } from 'react';
import { primaryTheme, secondaryTheme } from './Components/Shared/theme';
import { StyledButton } from './Components/Shared/styles';

const TestWrapper = styled.div`
  font-size: 2rem;
`;

function App() {
  const [theme, setTheme] = useState('primary');
  const themeToggler = () => {
    theme === 'primary' ? setTheme('secondary') : setTheme('primary');
  };
  return (
    <ThemeProvider theme={theme === 'primary' ? primaryTheme : secondaryTheme}>
      <GlobalStyles />
      <TestWrapper>Hello world</TestWrapper>
      <StyledButton onClick={() => themeToggler()}>Push me</StyledButton>
    </ThemeProvider>
  );
}

export default App;
