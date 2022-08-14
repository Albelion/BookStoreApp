import {
  StyledWrapper,
  StyledContainer,
  StyledButton,
} from '../../Shared/styles';
import { SortParams } from './Table';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { grey5 } from '../../Shared/styles';

const StyledTableHeader = styled.th`
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
  border: 3px solid purple;
`;
const StyledTextHeader = styled(StyledContainer)`
  text-align: center;
  padding: 11px 0px;
  width: 130px;
`;
interface TableHeaderProps {
  sortParams: SortParams;
  onSortedUp: (sort: SortParams) => void;
  onSortedDown: (sort: SortParams) => void;
  isVisible: boolean;
  isUpSort: boolean;
}
const StyledSwitcher = styled(StyledWrapper)`
  position: absolute;
  top: 0px;
  right: 1px;
`;
const StyledButtonWithDeactivated = styled(StyledButton)`
  padding: 0;
`;
const TableHeader = ({
  sortParams,
  onSortedUp,
  isVisible,
  isUpSort,
  onSortedDown,
}: TableHeaderProps) => {
  let name = '';
  switch (sortParams) {
    case SortParams.BOOKID:
      name = 'Id';
      break;
    case SortParams.NAME:
      name = 'Name';
      break;
    case SortParams.GENRE:
      name = 'Genre';
      break;
    case SortParams.NUMPAGE:
      name = 'Num pages';
      break;
    case SortParams.PUBLISH:
      name = 'Publish';
      break;
    case SortParams.RATING:
      name = 'Rating';
      break;
    case SortParams.PRICE:
      name = 'Price';
      break;
  }
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  useEffect(() => {
    setIsButtonsVisible(() => isVisible);
  }, [isVisible]);
  return (
    <StyledTableHeader>
      <StyledWrapper justifyContent="center" position="relative">
        <StyledTextHeader>{name}</StyledTextHeader>
        <StyledSwitcher flexDirection="column">
          <StyledButtonWithDeactivated onClick={() => onSortedUp(sortParams)}>
            <TiArrowSortedUp
              size="15px"
              color={isButtonsVisible && isUpSort ? '#000' : grey5}
            />
          </StyledButtonWithDeactivated>
          <StyledButtonWithDeactivated onClick={() => onSortedDown(sortParams)}>
            <TiArrowSortedDown
              size="15px"
              color={isButtonsVisible && !isUpSort ? '#000' : grey5}
            />
          </StyledButtonWithDeactivated>
        </StyledSwitcher>
      </StyledWrapper>
    </StyledTableHeader>
  );
};
export default TableHeader;
