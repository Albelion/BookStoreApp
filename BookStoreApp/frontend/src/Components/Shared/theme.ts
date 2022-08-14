import { DefaultTheme } from 'styled-components';
import { IMedia } from '../../styled';
import { grey6, grey1 } from './styles';

// Create theme with media
const mediaSettings: IMedia = {
  phone: '(max-width: 425px)',
  tablet: '(max-width: 768px) and (min-width:425px)',
  pc: '(min-width:768px)',
};
export const LightTheme: DefaultTheme = {
  bodyColor: '#F6FAF7',
  backgroundMain: '#fff',
  fontColorPrimary: '#000',
  fontColorSecondary: grey6,
  nameOfTheme: 'light',
  media: mediaSettings,
};
export const DarkTheme: DefaultTheme = {
  bodyColor: '#000',
  backgroundMain: '#000',
  fontColorPrimary: '#fff',
  fontColorSecondary: grey1,
  nameOfTheme: 'dark',
  media: mediaSettings,
};
