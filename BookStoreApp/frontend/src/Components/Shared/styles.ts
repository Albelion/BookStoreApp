import styled from 'styled-components';
import { defaultNoImageSrc } from '../../Data/BookData';
// Create colorful pallete
// Purple styles
export const purple1: string = '#EDE1F3';
export const purple2: string = '#DFC5EC';
export const purple3: string = '#CFABE1';
export const purple4: string = '#BE8DD7';
export const purple5: string = '#A86CC6';
export const purple6: string = '#8A46AC';
// Gray Styles
export const grey1: string = '#F4F4F4';
export const grey2: string = '#E4E4E4';
export const grey3: string = '#D5D3D6';
export const grey4: string = '#BDBCBE';
export const grey5: string = '#A6A4A7';
export const grey6: string = '#8A888B';

// Styled Buttons
interface ButtonProps {
  backgroundColor?: string;
  align?: string;
}
export const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey3 : purple5};
  }
  align-self: ${(props) => props.align || 'stretch'};
  background-color: ${(props) =>
    props.backgroundColor || props.theme.bodyColor};
  color: ${(props) => props.theme.fontColorPrimary};
`;

// Styled Container
interface ContainerProps {
  position?: string;
  display?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  alignSelf?: string;
}
export const StyledContainer = styled.div<ContainerProps>`
  display: ${(props) => props.display || 'block'};
  position: ${(props) => props.position || 'static'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  margin: ${(props) => props.margin || '0px'};
  padding: ${(props) => props.padding || '0px'};
  align-self: ${(props) => props.alignSelf || 'auto'};
`;
export const StyledFixedWidthSectionContainer = styled(StyledContainer)`
  max-width: 1140px;
  width: 100%;
`;

// Form Styles
export const StyledInput = styled.input`
  padding: 8px 10px;
  border: 1px solid ${grey5};
  border-radius: 3px;
  :focus {
    outline-color: ${grey5};
  }
  width: 100%;
  height: 35px;
`;
export const StyledLabel = styled.label`
  font-weight: bold;
`;
export const StyledErrorContainer = styled(StyledContainer)`
  color: red;
`;
export const StyledFieldSet = styled.fieldset`
  padding: 10px 15px;
  width: 80%;
`;
export const StyledDescriptionText = styled.textarea`
  resize: none;
  width: 100%;
  height: 150px;
  padding: 8px 10px;
  border: 1px solid ${grey5};
  border-radius: 3px;
  :focus {
    outline-color: ${grey5};
  }
`;
export const StyledSelectList = styled.select`
  width: 100%;
  padding: 2px 10px;
  height: 35px;
`;
export const StyledPostFormButton = styled(StyledButton)`
  background-color: ${purple5};
  color: ${(props) => props.theme.fontColorPrimary};
  font-weight: bold;
  border-radius: 3px;
  padding: 10px 8px;
  &:hover {
    background-color: ${purple3};
  }
  &:disabled {
    background-color: ${grey4};
    color: ${grey6};
  }
`;

// Styled Flex Wrapper
interface WrapperProps {
  display?: string;
  position?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  flex?: string;
  flexDirection?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  flexWrap?: string;
}
export const StyledWrapper = styled.div<WrapperProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'space-between'};
  align-items: ${(props) => props.alignItems || 'center'};
  gap: ${(props) => props.gap || '1px'};
  flex: ${(props) => props.flex || '0 1 auto'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  margin: ${(props) => props.margin || '0px'};
  padding: ${(props) => props.padding || '0px'};
  position: ${(props) => props.position || 'static'};
  flex-wrap: ${(props) => props.flexWrap || 'no-wrap'};
`;

// Main wrapper
export const StyledMainWrapperContainer = styled(StyledWrapper)`
  max-width: 1140px;
  margin: auto;
  flex-direction: column;
`;

// Styled Image by Default
interface DefaultImageProps {
  imageSrc: string;
}

export const ImageDefault = styled.img.attrs(
  ({ imageSrc }: DefaultImageProps): any => ({
    src: imageSrc.length === 0 ? defaultNoImageSrc : imageSrc,
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      (e.target as HTMLImageElement).onerror = null;
      (e.target as HTMLImageElement).src = defaultNoImageSrc;
    },
  }),
)``;
