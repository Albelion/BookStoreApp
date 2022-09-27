import { StyledWrapper } from './styles';
import {
  StyledBackground,
  StyledSuccessModalWrapper,
  StyledCancelButton,
  StyledMessage,
  StyledExitContainer,
} from './modalWindowStyles';

import { IoMdClose } from 'react-icons/io';

interface SuccessModalProps {
  message: string;
  onCloseSucessModal: () => void;
}

const SuccessModal = ({ message, onCloseSucessModal }: SuccessModalProps) => {
  return (
    <StyledBackground>
      <StyledSuccessModalWrapper>
        <StyledExitContainer>
          <StyledCancelButton onClick={() => onCloseSucessModal()}>
            <IoMdClose size="20px" />
          </StyledCancelButton>
        </StyledExitContainer>
        <StyledWrapper
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <StyledMessage>{message}</StyledMessage>
        </StyledWrapper>
      </StyledSuccessModalWrapper>
    </StyledBackground>
  );
};

export default SuccessModal;
