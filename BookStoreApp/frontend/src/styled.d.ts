import 'styled-components';
interface IMedia {
  phone: string;
  tablet: string;
  pc: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    bodyColor: string;
    fontColorPrimary: string;
    fontColorSecondary: string;
    nameOfTheme: string;
    media: IMedia;
  }
}
