import styled from 'styled-components';
// Create colorful pallete
// Purple styles
export const purple1 = '#EDE1F3';
export const purple2 = '#DFC5EC';
export const purple3 = '#CFABE1';
export const purple4 = '#BE8DD7';
export const purple5 = '#A86CC6';
export const purple6 = '#8A46AC';
// Gray Styles
export const grey1 = '#F4F4F4';
export const grey2 = '#E4E4E4';
export const grey3 = '#D5D3D6';
export const grey4 = '#BDBCBE';
export const grey5 = '#A6A4A7';
export const grey6 = '#8A888B';

// Styled Buttons
interface ButtonProps {
  backgroundColor?: string;
  align?: string;
}
export const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom: 2px solid ${purple5};
    background-color: ${grey1};
  }
  align-self: ${(props) => props.align || 'stretch'};
  background-color: ${(props) => props.backgroundColor || 'white'};
`;

// Styled Container
interface ContainerProps {
  position?: string;
  display?: string;
}
export const StyledContainer = styled.div<ContainerProps>`
  display: ${(props) => props.display || 'block'};
  position: ${(props) => props.position || 'static'};
`;

// Styled Flex Wrapper
interface WrapperProps {
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
}
export const StyledWrapper = styled.div<WrapperProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'space-between'};
  align-items: ${(props) => props.alignItems || 'center'};
  gap: ${(props) => props.gap || '1px'};
`;
