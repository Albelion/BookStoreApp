import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledWrapper,
  StyledContainer,
  StyledButton,
  grey3,
  grey6,
  grey2,
} from '../Shared/styles';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';

const StyledPaginationLinks = styled(Link)<{ $isactive?: boolean }>`
  @media ${(props) => props.theme.media.phone} {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey2 : grey6};
  }
  padding: 10px 15px;
  text-decoration: none;
  color: ${(props) => props.theme.fontColorPrimary};
  background-color: ${(props) =>
    props.$isactive
      ? props.theme.nameOfTheme === 'light'
        ? grey3
        : grey6
      : props.theme.bodyColor};
`;
const StyledArrowLeft = styled(HiArrowSmLeft)`
  font-size: 20px;
  @media ${(props) => props.theme.media.phone} {
    font-size: 15px;
  } ;
`;
const StyledArrowRight = styled(HiArrowSmRight)`
  font-size: 20px;
  @media ${(props) => props.theme.media.phone} {
    font-size: 15px;
  } ;
`;
const StyledWrapperPagination = styled(StyledWrapper)`
  border: 1px solid ${grey3};
  border-radius: 10px;
  @media ${(props) => props.theme.media.phone} {
    font-size: 0.8rem;
  } ;
`;
const StyledButtonLinkLeft = styled(StyledButton)`
  @media ${(props) => props.theme.media.phone} {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  padding: 10px 15px;
  border-radius: 10px 0px 0px 10px;
  &:hover {
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey3 : grey6};
  }
  &:disabled {
    background-color: ${(props) =>
      props.theme.nameOfTheme === 'light' ? grey2 : grey6};
    color: ${(props) => props.theme.fontColorSecondary};
  }
`;
const StyledButtonLinkRight = styled(StyledButtonLinkLeft)`
  border-radius: 0px 10px 10px 0px;
`;
const StyledSymbContainer = styled(StyledContainer)`
  padding: 10px 15px;
  @media ${(props) => props.theme.media.phone} {
    padding: 6px 10px;
  }
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
  // number of center viewed elemets
  const numberOfCentralElements = 3;
  // number of maximum elements before skip symbol
  const maxNumberToSkip = 5;
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
            const isLeftSkip = numPages <= maxNumberToSkip ? false : true;
            if (isLeftSkip) {
              mapArray = [
                1,
                '...',
                ...[...Array(numberOfCentralElements)].map(
                  (x, i) => numPages - 2 + i,
                ),
              ];
            } else {
              mapArray = [...[...Array(numPages)].map((x, i) => i + 1)];
            }
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
      if (props.currentPage === numPages) isNext = false;
      const isRightSkip = numPages <= maxNumberToSkip ? false : true;
      if (isRightSkip) {
        mapArray = [
          ...[...Array(numberOfCentralElements)].map((x, i) => i + 1),
          '...',
          'endSymb',
        ];
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
                <StyledArrowLeft />
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
                  $isactive={true}
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
                <StyledArrowRight />
              </StyledWrapper>
            </StyledButtonLinkRight>
          </StyledWrapperPagination>
        </StyledWrapper>
      )}
    </>
  );
};
export default PaginationSectionModern;
