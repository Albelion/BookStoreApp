import { createGlobalStyle } from 'styled-components';

// Declare global styles with default settings

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lora', serif;
    font-size: '16px';
  }
  body{
    color: ${(props) => props.theme.fontColorPrimary};
    background-color: ${(props) => props.theme.bodyColor}
  }
`;
export default GlobalStyles;
