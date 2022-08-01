import 'styled-components';
interface IMedia {
  phone: string;
  tablet: string;
  pc: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    bodyColor: string;
    fontColor: string;
    media: IMedia;
  }
}
