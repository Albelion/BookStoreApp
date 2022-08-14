import 'styled-components';
interface IMedia {
  phone: string;
  tablet: string;
  pc: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    bodyColor: string;
    backgroundMain: string;
    fontColorPrimary: string;
    fontColorSecondary: string;
    nameOfTheme: string;
    media: IMedia;
  }
}
