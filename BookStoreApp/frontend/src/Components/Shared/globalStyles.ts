import { createGlobalStyle } from 'styled-components';

// Declare global styles with default settings
const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lora', serif;
    background-color: ${(props) => props.theme.colors.primary}
  }
`;
export default GlobalStyles;
