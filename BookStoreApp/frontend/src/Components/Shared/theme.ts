import { DefaultTheme } from 'styled-components';
import { IMedia } from '../../styled';

// Create theme with media
const mediaSettings: IMedia = {
  phone: '(max-width: 425px)',
  tablet: '(max-width: 768px) and (min-width:425px)',
  pc: '(min-width:768px)',
};
export const primaryTheme: DefaultTheme = {
  bodyColor: '#fff',
  fontColor: '#000',
  media: mediaSettings,
};
export const secondaryTheme: DefaultTheme = {
  bodyColor: '#000',
  fontColor: '#fff',
  media: mediaSettings,
};
