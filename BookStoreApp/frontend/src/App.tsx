import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Components/Shared/globalStyles';
import { useState } from 'react';
import { primaryTheme, secondaryTheme } from './Components/Shared/theme';
//import { StyledButton } from './Components/Shared/styles';
import { Header } from './Components/Header/Header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState('primary');
  const themeToggler = () => {
    theme === 'primary' ? setTheme('secondary') : setTheme('primary');
  };
  return (
    <ThemeProvider theme={theme === 'primary' ? primaryTheme : secondaryTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Header onChangeTheme={themeToggler} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
