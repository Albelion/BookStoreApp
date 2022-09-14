import { StyledContainer, StyledButton, StyledInput } from './styles';
import styled from 'styled-components';
import { grey4, grey2, grey3 } from './styles';

export const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const StyledModalWrapper = styled(StyledContainer)`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  border-radius: 10px;
  color: ${(props) => props.theme.fontColorPrimary};
  background-color: ${(props) => props.theme.bodyColor};
`;

export const StyledLoadingBackground = styled(StyledContainer)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
`;

export const StyledSuccessModalWrapper = styled(StyledModalWrapper)`
  width: 400px;
  height: 360px;
`;

export const StyledButtonModal = styled(StyledButton)`
  width: 190px;
  font-size: 0.9em;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
export const StyledButtonSuccessModal = styled(StyledButtonModal)`
  background-color: #3aca5e;
  &:hover {
    background-color: #3fdc66;
  }
  color: #fff;
`;
export const StyledButtonNormalModal = styled(StyledButtonModal)`
  background-color: ${grey4};
  &:hover {
    background-color: ${grey2};
  }
`;
export const StyledModalHeader = styled(StyledContainer)`
  font-size: 1.2em;
  font-weight: bold;
`;
export const StyledCancelButton = styled.button`
  border: 0;
  padding: 3px 4px 2px 4px;
  border-radius: 8px;
  margin: 3px;
  background-color: ${grey3};
  &:hover {
    cursor: pointer;
    background-color: ${grey2};
  }
`;
export const StyledInputLogin = styled(StyledInput)`
  width: 250px;
`;

export const StyledMessage = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
export const StyledExitContainer = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
`;
export const StyledMessageLoading = styled(StyledContainer)`
  color: #fff;
  font-size: bold;
  font-weight: 1.2rem;
`;
