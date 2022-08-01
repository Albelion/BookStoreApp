import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
    media: {
      phone: string;
      tablet: string;
      pc: string;
    };
  }
}
