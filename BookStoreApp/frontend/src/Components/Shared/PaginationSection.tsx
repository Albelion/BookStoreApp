import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledWrapper } from '../Shared/styles';
import { grey3 } from '../Shared/styles';

const StyledPaginationLinks = styled(Link)<{ bgcolor?: string }>`
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  background-color: ${(props) => props.bgcolor || props.theme.bodyColor};
`;

interface PaginationSectionProps {
  numOfAllBooks: number;
  currentPage: number;
  pageSize: number;
}

const PaginationSection = ({ ...props }: PaginationSectionProps) => {
  const numPages = Math.ceil(props.numOfAllBooks / props.pageSize);

  return (
    <>
      {numPages !== 0 && (
        <StyledWrapper justifyContent="start" margin="10px 0px">
          {[...Array(numPages)].map((x, i) => {
            return i + 1 === props.currentPage ? (
              <StyledPaginationLinks
                key={i}
                bgcolor={grey3}
                to={`/page/${i + 1}`}
              >
                {i + 1}
              </StyledPaginationLinks>
            ) : (
              <StyledPaginationLinks key={i} to={`/page/${i + 1}`}>
                {i + 1}
              </StyledPaginationLinks>
            );
          })}
        </StyledWrapper>
      )}
    </>
  );
};
export default PaginationSection;
