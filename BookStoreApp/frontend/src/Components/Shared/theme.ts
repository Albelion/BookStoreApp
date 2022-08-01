import { DefaultTheme } from 'styled-components';

// Create theme with media
const theme: DefaultTheme = {
  colors: {
    primary: 'white',
    secondary: 'black',
  },
  media: {
    phone: '(max-width: 425px)',
    tablet: '(max-width: 768px) and (min-width:425px)',
    pc: '(min-width:768px)',
  },
};

export default theme;
