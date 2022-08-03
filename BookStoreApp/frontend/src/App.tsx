import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState } from 'react';
import { primaryTheme, secondaryTheme } from './Components/Shared/theme';
//import { StyledButton } from './Components/Shared/styles';
import { Header } from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { StyledWrapper, StyledContainer } from './Components/Shared/styles';
import styled from 'styled-components';

const StyledMainWrapperContainer = styled(StyledWrapper)`
  max-width: 1140px;
  margin: auto;
  flex-direction: column;
`;

function App() {
  const [theme, setTheme] = useState('primary');
  const themeToggler = () => {
    theme === 'primary' ? setTheme('secondary') : setTheme('primary');
  };
  return (
    <ThemeProvider theme={theme === 'primary' ? primaryTheme : secondaryTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <StyledContainer>
          <StyledMainWrapperContainer>
            <Header onChangeTheme={themeToggler} />
            <Routes>
              <Route path="" element={<HomePage />} />
            </Routes>
          </StyledMainWrapperContainer>
        </StyledContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
