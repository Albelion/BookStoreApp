import { StyledContainer } from '../../Shared/styles';
import { purple6 } from '../../Shared/styles';
import styled from 'styled-components';

const StyledTableData = styled.td`
  text-align: center;
  letter-spacing: 0.3px;
  border: 1px solid ${purple6};
`;

interface TableBodyProps {
  inform: any;
}
const TableData = ({ inform }: TableBodyProps) => {
  return (
    <StyledTableData>
      <StyledContainer>{inform}</StyledContainer>
    </StyledTableData>
  );
};
export default TableData;
