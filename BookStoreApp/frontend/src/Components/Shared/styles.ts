import styled from 'styled-components';
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
      props.theme.nameOfTheme === 'light' ? grey3 : grey1};
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
