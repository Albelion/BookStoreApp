import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledWrapper, StyledContainer, StyledButton } from '../Shared/styles';
import { grey3, grey6, grey2 } from '../Shared/styles';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const StyledPaginationLinks = styled(Link)<{ isactive?: boolean }>`
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey2 : grey6};
  }
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  background-color: ${(props) =>
    props.isactive
      ? props.theme.nameOfTheme === 'light'
        ? grey3
        : grey6
      : props.theme.bodyColor};
`;
const StyledWrapperPagination = styled(StyledWrapper)`
  border: 1px solid ${grey3};
  border-radius: 10px;
`;
const StyledButtonLinkLeft = styled(StyledButton)`
  padding: 10px 15px;
  border-radius: 10px 0px 0px 10px;
  &:hover {
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey3 : grey6};
  }
`;
const StyledButtonLinkRight = styled(StyledButtonLinkLeft)`
  border-radius: 0px 10px 10px 0px;
`;
const StyledSymbContainer = styled(StyledContainer)`
  padding: 10px 15px;
  color: ${(props) => props.theme.fontColorSecondary};
`;

interface PaginationSectionProps {
  numOfAllBooks: number;
  currentPage: number;
  pageSize: number;
  search?: string;
}
const PaginationSectionModern = ({ ...props }: PaginationSectionProps) => {
  const navigate = useNavigate();
  const onPage = (isPrevious: boolean) => {
    navigate(
      props.search
        ? `/search?criteria=${props.search}&page=${
            isPrevious ? props.currentPage - 1 : props.currentPage + 1
          }`
        : `/page/${isPrevious ? props.currentPage - 1 : props.currentPage + 1}`,
    );
  };
  // Number of all pages
  const numPages = Math.ceil(props.numOfAllBooks / props.pageSize);
  // difference between start and end element
  const diff = 4;
  // Array to store pagination symbol
  let mapArray: any[] = [];
  // next and previous button state
  let isPrevious = true;
  let isNext = true;
  if (props.currentPage !== 0) {
    if (props.currentPage !== 1) {
      if (
        props.currentPage - 1 >= diff &&
        numPages - props.currentPage >= diff
      ) {
        // left and right skip symbol are true
        mapArray = [
          1,
          '...',
          ...[props.currentPage - 1, props.currentPage, props.currentPage + 1],
          '...',
          'endSymb',
        ];
      } else {
        if (props.currentPage - 1 >= diff) {
          if (props.currentPage === numPages) {
            isNext = false;
            // left is true and right skip is false
            mapArray = [
              1,
              '...',
              ...[...Array(3)].map((x, i) => numPages - 2 + i),
            ];
          } else {
            mapArray = [
              1,
              '...',
              ...[...Array(numPages - (props.currentPage - 2))].map(
                (x, i) => props.currentPage - 1 + i,
              ),
            ];
          }
        } else {
          if (numPages - props.currentPage >= diff) {
            // left is false and right true is false
            mapArray = [
              ...[...Array(props.currentPage + 1)].map((x, i) => i + 1),
              '...',
              'endSymb',
            ];
          } else {
            if (props.currentPage === numPages) isNext = false;
            mapArray = [...[...Array(numPages)].map((x, i) => i + 1)];
          }
        }
      }
    } else {
      isPrevious = false;
      const isRightSkip = numPages <= 5 ? false : true;
      if (isRightSkip) {
        mapArray = [...[...Array(3)].map((x, i) => i + 1), '...', 'endSymb'];
      } else {
        mapArray = [...[...Array(numPages)].map((x, i) => i + 1)];
      }
    }
  }
  return (
    <>
      {numPages > 0 && (
        <StyledWrapper justifyContent="center" margin="20px">
          <StyledWrapperPagination justifyContent="start" margin="10px 0px">
            <StyledButtonLinkLeft
              onClick={() => onPage(true)}
              disabled={isPrevious ? false : true}
            >
              <StyledWrapper>
                <HiArrowSmLeft size="20px" />
                <StyledContainer>Назад</StyledContainer>
              </StyledWrapper>
            </StyledButtonLinkLeft>
            {mapArray.map((x, i) => {
              if (x === '...') {
                return <StyledSymbContainer key={i}>...</StyledSymbContainer>;
              }
              if (x === 'endSymb') {
                return (
                  <StyledSymbContainer key={i}>{numPages}</StyledSymbContainer>
                );
              }
              return Number(x) === props.currentPage ? (
                <StyledPaginationLinks
                  key={i}
                  isactive={true}
                  to={
                    props.search
                      ? `/search?criteria=${props.search}&page=${Number(x)}`
                      : `/page/${Number(x)}`
                  }
                >
                  {Number(x)}
                </StyledPaginationLinks>
              ) : (
                <StyledPaginationLinks
                  key={i}
                  to={
                    props.search
                      ? `/search?criteria=${props.search}&page=${Number(x)}`
                      : `/page/${Number(x)}`
                  }
                >
                  {Number(x)}
                </StyledPaginationLinks>
              );
            })}
            <StyledButtonLinkRight
              onClick={() => onPage(false)}
              disabled={isNext ? false : true}
            >
              <StyledWrapper>
                <StyledContainer>Вперед</StyledContainer>
                <HiArrowSmRight size="20px" />
              </StyledWrapper>
            </StyledButtonLinkRight>
          </StyledWrapperPagination>
        </StyledWrapper>
      )}
    </>
  );
};
export default PaginationSectionModern;
