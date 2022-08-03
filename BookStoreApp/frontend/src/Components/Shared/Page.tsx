import styled from 'styled-components';
import React from 'react';
import { StyledFixedWidthSectionContainer, StyledContainer } from './styles';

interface PageProps {
  title: string;
  children: React.ReactNode;
}
const StyledSectionWrapper = styled.section`
  text-align: center;
`;
const StyledTitleContainer = styled(StyledContainer)`
  font-size: 2rem;
  font-weight: bold;
  padding-top: 3vh;
  padding-bottom: 5vh;
`;

export const Page = ({ title, children }: PageProps) => {
  return (
    <StyledFixedWidthSectionContainer>
      <StyledSectionWrapper>
        <StyledTitleContainer>{title}</StyledTitleContainer>
        {children}
      </StyledSectionWrapper>
    </StyledFixedWidthSectionContainer>
  );
};
